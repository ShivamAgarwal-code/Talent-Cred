'use client'

import React, { useEffect, useState } from 'react'
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { CreditTalentCenterABI } from '@/components/onchain/abis/CreditTalentCenter'
import { LoanApplicationExtended } from '@/types/api'
import { updateLoanApplication } from '@/services/loanApplication'

export function DenyModalButton({
  loanApplication,
}: {
  loanApplication: LoanApplicationExtended
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [reason, setReason] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const {
    data: hash,
    writeContractAsync: denyApplication,
    isPending: isDenyPending,
  } = useWriteContract()

  const { isLoading: isLoadingDenyTx, isSuccess: isSuccessDenyTx } =
    useWaitForTransactionReceipt({
      hash,
    })

  const handleDeny = async () => {
    setIsLoading(true)
    try {
      const CREDIT_TALENT_CENTER_CONTRACT =
        '0x0E44B48406b5E7Bba4E6d089542719Cb2577d444'

      // Start the transaction
      await denyApplication({
        address: CREDIT_TALENT_CENTER_CONTRACT,
        abi: CreditTalentCenterABI,
        functionName: 'rejectCredit',
        args: [loanApplication.walletId, loanApplication.applicant.id, reason],
      })
      // TODO: update DB

      toast.info('Solicitud de denegación enviada...')
      setIsOpen(false)
    } catch (error) {
      console.error('Deny failed:', error)
      toast.error(
        'Hubo un error al denegar la solicitud, por favor intenta de nuevo',
      )
      setIsLoading(false)
    }
  }

  useEffect(() => {
    async function updateLoanApp() {
      if (!loanApplication.id) {
        return toast.error(
          'No existe id para esta solicitud, contactar al admin',
        )
      }
      const updatedLoanApp = await updateLoanApplication({
        id: loanApplication.id,
        status: 'REJECTED',
      })

      if (updatedLoanApp.status === 'REJECTED') {
        toast.success('Solicitud rechazada exitosamente')
      } else {
        toast.warning(
          'No se ha actualizado la solicitud en la base de datos, contactar al admin',
        )
      }

      setIsLoading(false)
    }

    if (isSuccessDenyTx) {
      updateLoanApp()
    }
  }, [isSuccessDenyTx, loanApplication.id])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-primary hover:bg-primary/60"
        >
          Denegar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] md:max-w-[576px] lg:max-w-[768px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Denegar Solicitud
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            ¿Estás seguro que quieres denegar la solicitud de{' '}
            {loanApplication.applicant.name}?
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 grid gap-4">
          {' '}
          {/* Use grid for layout */}
          <div>
            <Label htmlFor="reason">Motivo del Rechazo</Label>
            <Input
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <div className="flex justify-center gap-4">
            <Button
              variant="destructive"
              onClick={handleDeny}
              disabled={
                isDenyPending || isLoadingDenyTx || !reason || isLoading
              }
            >
              {isDenyPending || isLoadingDenyTx || isLoading ? (
                <span>Rechazando...</span>
              ) : (
                'Rechazar'
              )}
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
          </div>
        </div>

        {hash && (
          <div className="flex flex-col items-center pt-4">
            <a
              className="flex items-center gap-x-1.5 text-lg hover:text-primary"
              href={`YOUR_BLOCK_EXPLORER_URL/tx/${hash}`} // Replace with your block explorer
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver en explorador
            </a>
            {isLoadingDenyTx && <p>Firmando rechazo...</p>}
            {isSuccessDenyTx && <p>Rechazo confirmado</p>}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
