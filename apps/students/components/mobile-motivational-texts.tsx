'use client'

import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle } from "@repo/ui/components/dialog";
import { MotivationalTexts } from "./motivational-texts";
import { EssayTopicDetail } from "@repo/types";

interface Props {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  topic: EssayTopicDetail;
}
export default function MobileMotivationalTexts({ isOpen, onClose, topic }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            <div className="no-scrollbar -mx-4 max-h-[600px] overflow-y-auto px-4">
              <MotivationalTexts topic={topic} />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}