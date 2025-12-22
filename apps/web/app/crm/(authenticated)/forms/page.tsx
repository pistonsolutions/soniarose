'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Code } from 'lucide-react';

interface FormSubmission {
    id: string;
    formId: string;
    formName: string;
    status: string;
    createdAt: string;
    contact?: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
    };
    payload: any;
}

export default function FormsPage() {
    const { userId, getToken } = useAuth();
    const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSubmissions() {
            if (!userId) return;
            try {
                const token = await getToken();
                // Remove duplicate /api if present in NEXT_PUBLIC_API_URL
                const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api').replace(/\/api$/, '');
                const res = await fetch(`${baseUrl}/api/tally?userId=${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.ok) {
                    const data = await res.json();
                    setSubmissions(data);
                }
            } catch (error) {
                console.error('Failed to fetch submissions', error);
            } finally {
                setLoading(false);
            }
        }
        fetchSubmissions();
    }, [userId, getToken]);

    if (loading) return <div>Loading submissions...</div>;

    return (
        <div className="space-y-6">
            <header>
                <h2 className="text-3xl font-semibold">Form Submissions</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    View all incoming form data and check for processing errors.
                </p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Form Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Data</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {submissions.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                                        No submissions yet.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                submissions.map((sub) => (
                                    <TableRow key={sub.id}>
                                        <TableCell className="whitespace-nowrap">
                                            {format(new Date(sub.createdAt), 'MMM d, yyyy HH:mm')}
                                        </TableCell>
                                        <TableCell>{sub.formName || sub.formId}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    sub.status === 'PROCESSED'
                                                        ? 'default' // Changed from 'success' to 'default' as 'success' might not exist in standard shadcn
                                                        : sub.status === 'FAILED'
                                                            ? 'destructive'
                                                            : 'secondary'
                                                }
                                            >
                                                {sub.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {sub.contact ? (
                                                <Link
                                                    href={`/crm/contacts/${sub.contact.id}`}
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {sub.contact.firstName} {sub.contact.lastName}
                                                </Link>
                                            ) : (
                                                <span className="text-muted-foreground">—</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="sm">
                                                        <Code className="h-4 w-4 mr-2" /> View Payload
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                                    <DialogHeader>
                                                        <DialogTitle>Raw Payload</DialogTitle>
                                                    </DialogHeader>
                                                    <pre className="bg-slate-100 p-4 rounded text-xs overflow-x-auto dark:bg-slate-900">
                                                        {JSON.stringify(sub.payload, null, 2)}
                                                    </pre>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
