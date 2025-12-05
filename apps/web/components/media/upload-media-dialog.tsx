'use client';

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ContactSelect } from '@/components/contacts/contact-select';
import { Upload, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

export function UploadMediaDialog({ onUploadComplete }: { onUploadComplete?: () => void }) {
    const { getToken } = useAuth();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [tag, setTag] = useState('');
    const [contactIds, setContactIds] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setError(null);

        try {
            const token = await getToken();
            const formData = new FormData();
            formData.append('file', file);
            formData.append('tag', tag);
            if (contactIds.length > 0) {
                formData.append('contactIds', JSON.stringify(contactIds));
            }

            const res = await fetch('http://localhost:3001/api/media/upload', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!res.ok) {
                throw new Error('Upload failed');
            }

            setSuccess(true);
            setTimeout(() => {
                setIsOpen(false);
                setSuccess(false);
                setFile(null);
                setTag('');
                setContactIds([]);
                onUploadComplete?.();
                router.refresh();
            }, 1500);
        } catch (err: any) {
            setError(err.message || 'Failed to upload');
        } finally {
            setUploading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2 bg-brand-navy hover:bg-brand-navy/90 text-white dark:bg-brand-gold dark:text-brand-navy dark:hover:bg-brand-gold/90">
                    <Upload className="h-4 w-4" />
                    Upload Video
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Upload Video Asset</DialogTitle>
                </DialogHeader>

                {success ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-300">
                        <div className="rounded-full bg-emerald-100 p-4 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 mb-4">
                            <CheckCircle2 className="h-10 w-10" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Upload Complete!</h3>
                        <p className="mt-2 text-slate-500 dark:text-slate-400">Your video has been processed and added to the library.</p>
                    </div>
                ) : (
                    <div className="space-y-6 py-4">
                        <div
                            className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors ${dragActive
                                ? "border-brand-gold bg-brand-gold/5"
                                : "border-slate-200 hover:border-brand-gold/50 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900"
                                }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <Input
                                id="file"
                                type="file"
                                accept="video/*"
                                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                            />
                            <div className="rounded-full bg-slate-100 p-4 dark:bg-slate-800 mb-4">
                                <Upload className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                            </div>
                            {file ? (
                                <div className="text-center">
                                    <p className="font-medium text-slate-900 dark:text-white">{file.name}</p>
                                    <p className="text-xs text-slate-500 mt-1">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                </div>
                            ) : (
                                <div className="text-center space-y-1">
                                    <p className="font-medium text-slate-900 dark:text-white">Click to upload or drag and drop</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">MP4, MOV or WebM (max 100MB)</p>
                                </div>
                            )}
                        </div>

                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="tag">Asset Tag</Label>
                                <Input
                                    id="tag"
                                    value={tag}
                                    onChange={(e) => setTag(e.target.value)}
                                    placeholder="e.g. Birthday, Holiday, Welcome..."
                                    className="h-10"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label>Assign to Contacts (Optional)</Label>
                                <ContactSelect value={contactIds} onChange={setContactIds} />
                                <p className="text-[10px] text-slate-500">
                                    Assigning to contacts makes this video specific to them.
                                </p>
                            </div>
                        </div>

                        {error && (
                            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400 flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                {error}
                            </div>
                        )}

                        <div className="flex justify-end gap-3 pt-2">
                            <Button variant="outline" onClick={() => setIsOpen(false)} disabled={uploading}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleUpload}
                                disabled={!file || uploading}
                                className="bg-brand-navy hover:bg-brand-navy/90 text-white dark:bg-brand-gold dark:text-brand-navy dark:hover:bg-brand-gold/90"
                            >
                                {uploading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    'Upload Asset'
                                )}
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
