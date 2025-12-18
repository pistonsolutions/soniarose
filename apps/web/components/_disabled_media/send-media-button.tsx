'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { MediaAsset } from '@/lib/types';
import { SendMediaDialog } from './send-media-dialog';

interface SendMediaButtonProps {
    asset: MediaAsset;
}

export function SendMediaButton({ asset }: SendMediaButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(true)}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
            </Button>
            <SendMediaDialog isOpen={isOpen} onOpenChange={setIsOpen} media={asset} />
        </>
    );
}
