import { Button } from './ui/button'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

type ConfirmationAlertProps = {
  action: () => void
  description?: string
  loading?: boolean
  open?: boolean
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  trigger?: React.ReactNode
}

export function ConfirmationAlert({ action, description, loading, open, setOpen, trigger }: ConfirmationAlertProps) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah Anda Yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            {description ?? 'Aksi ini tidak dapat dikembalikan. Perubahan ini akan menghapus data dari database.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction asChild onClick={action}>
            <Button loading={loading}>Yakin</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
