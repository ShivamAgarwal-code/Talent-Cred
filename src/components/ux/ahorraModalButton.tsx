import React, { useState, useEffect } from 'react'
// import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi'
import { ERC20ABI } from '@/components/onchain/abis/erc20'
import { useBalanceOf } from '@/hooks/useBalanceOf'
// import useSupply from '@/hooks/useSupply'
import { Abi, Address } from 'viem'
import Pool from '../onchain/abis/Pool'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { ExternalLinkIcon, LoaderCircle } from 'lucide-react'
import Link from 'next/link'

export default function AhorraModalButton() {
  const { address } = useAccount()
  const [amount, setAmount] = useState('')
  const [requiresApproval, setRequiresApproval] = useState(false)
  const [assetAllowanceState, setAssetAllowanceState] = useState('0')
  const [balanceError, setBalanceError] = useState<string | null>(null)
  const [depositPercentage, setDepositPercentage] = useState<number | null>(
    null,
  )

  // Use the existing hooks for balance and allowance
  const assetContract = '0xa411c9Aa00E020e4f88Bc19996d29c5B7ADB4ACf'
  const { balance: assetBalance } = useBalanceOf({
    tokenAddress: assetContract,
    walletAddress: address as Address,
  })

  const poolContract = '0x7a8AE9bB9080670e2BAFb6Df3EA62968F4Ad8a88'
  const {
    data: assetAllowance,
    isError: isAssetAllowanceError,
    isLoading: isAssetAllowanceLoading,
    refetch: refetchAllowance,
  } = useReadContract({
    address: assetContract,
    abi: ERC20ABI,
    functionName: 'allowance',
    args: [address as Address, poolContract],
  })

  useEffect(() => {
    if (isAssetAllowanceError) {
      console.error('Error fetching allowance')
      setAssetAllowanceState('0')
    } else if (!isAssetAllowanceLoading && assetAllowance) {
      const allowanceInEther = (Number(assetAllowance) / 1e18).toFixed(7)
      setAssetAllowanceState(allowanceInEther)
    }
  }, [assetAllowance, isAssetAllowanceError, isAssetAllowanceLoading])

  const {
    writeContractAsync: approveERC20,
    isError: isApprovalError,
    isPending: isApprovalPending,
    isSuccess: isApprovalSuccess,
    data: hash,
  } = useWriteContract()

  const { isLoading: isApprovalConfirming, isSuccess: isApprovalConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  useEffect(() => {
    // async function checkAfterRefetch() {
    //   await refetchAllowance()
    //   checkIfApprovalNeeded()
    // }

    if (isApprovalError) {
      console.error('Error during approval')
      setRequiresApproval(true)
    } else if (isApprovalPending || isApprovalConfirming) {
      setRequiresApproval(true)
    } else if (isApprovalConfirmed) {
      // checkAfterRefetch()
      console.log('Approval successful')
      setRequiresApproval(false)
    }
  }, [
    isApprovalError,
    isApprovalSuccess,
    isApprovalPending,
    isApprovalConfirming,
    isApprovalConfirmed,
    refetchAllowance,
  ])

  const { isLoading: isApprovalLoading, isSuccess: isApprovalTxSuccess } =
    useWaitForTransactionReceipt({ hash })

  /*   const {
    handleSupply: handleDeposit,
    isPending: isDepositPending,
    isError: isDepositError,
    status: depositStatus,
    error,
    data: depositHash,
  } = useSupply()
 */

  const {
    writeContractAsync: handleDeposit,
    isPending: isDepositPending,
    isError: isDepositError,
    error,
    data: depositHash,
  } = useWriteContract()

  const { isLoading: isDepositConfirming, isSuccess: isDepositConfirmed } =
    useWaitForTransactionReceipt({
      hash: depositHash,
    })

  const handleSupply = async () => {
    const assetAmount = parseFloat(amount) || 0
    const amountInWei = BigInt(assetAmount * 1e18)

    try {
      await handleDeposit({
        abi: Pool as Abi,
        address: poolContract as Address,
        functionName: 'supply',
        args: [assetContract as Address, amountInWei, address as Address, 0],
      })
    } catch (err) {
      console.error('Error executing contract function:', err)
    }
  }
  useEffect(() => {
    const assetAmount = parseFloat(amount) || 0
    if (assetBalance && assetAmount > parseFloat(assetBalance)) {
      setBalanceError("You don't have enough tokens in your wallet")
    } else {
      setBalanceError(null) // Clear error if valid
    }
  }, [amount, assetBalance])

  useEffect(() => {
    // Function to check if approval is required
    const main = () => {
      const assetAmount = parseFloat(amount) || 0

      // Compare the input value against the allowance state
      const needsApproval = assetAmount > parseFloat(assetAllowanceState)
      setRequiresApproval(needsApproval)
    }

    main()
  }, [amount, assetAllowanceState])

  useEffect(() => {
    // Function to check if approval is required
    const main = () => {
      const assetAmount = parseFloat(amount) || 0

      // Compare the input value against the allowance state
      const needsApproval = assetAmount > parseFloat(assetAllowanceState)
      setRequiresApproval(needsApproval)
    }
    if (isApprovalTxSuccess) {
      main()
    }
  }, [amount, assetAllowanceState, isApprovalTxSuccess])

  // Function to check if approval is required
  function checkIfApprovalNeeded() {
    const assetAmount = parseFloat(amount) || 0

    // Compare the input value against the allowance state
    const needsApproval = assetAmount > parseFloat(assetAllowanceState)
    setRequiresApproval(needsApproval)
  }

  useEffect(() => {
    if (isDepositError) {
      console.error(
        'Deposit error:',
        error?.message || 'An unknown error occurred.',
      )
    }
    if (depositHash) {
      console.log('Deposit successful, transaction hash:', depositHash)
    }
  }, [isDepositError, depositHash, error])

  useEffect(() => {
    const assetAmount = parseFloat(amount ?? '0') || 0

    if (assetAmount < 0 || isNaN(assetAmount)) {
      setBalanceError(null) // Clear balance-related errors if amount is invalid
      console.error('Amount must be a positive number.')
    } else if (assetBalance && assetAmount > parseFloat(assetBalance)) {
      setBalanceError("You don't have enough tokens in your wallet")
    } else {
      setBalanceError(null) // Clear any balance-related errors
    }
  }, [amount, assetBalance])

  const handleApproval = async () => {
    const assetAmount = parseFloat(amount) || 0

    try {
      if (assetAmount > parseFloat(assetAllowanceState)) {
        await approveERC20({
          abi: ERC20ABI,
          address: assetContract as Address,
          functionName: 'approve',
          args: [poolContract, assetAmount * 1e18],
        })
      }
    } catch (error) {
      console.error('Error approving', error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        <Button className="text-lg">Quiero ahorrar</Button>
      </DialogTrigger>
      <DialogContent className="md:px-8 lg:px-16">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl">
            Ahorra en Cuenta Sustantiva
          </DialogTitle>
          <DialogDescription className="text-left text-lg">
            Deposita tus fondos en el contrato de Alux, donde recibirás un
            rendimiento preferencial
          </DialogDescription>
        </DialogHeader>
        <div className="w-full justify-center gap-1.5">
          <Label className="text-lg" htmlFor="value">
            Cantidad a depositar
          </Label>
          <div className="relative w-full">
            <Input
              name="value"
              placeholder="1000"
              required
              type="number"
              min={1}
              step={1}
              onChange={(event) => {
                setAmount(event.target.value)
                setDepositPercentage(null)
              }}
              className="pr-12" // Add right padding to make room for the currency indicator
              value={amount}
            />
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-sm font-bold text-foreground">
              MXN
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-x-6">
          <Button
            onClick={() => {
              setDepositPercentage(25)
              setAmount((parseFloat(assetBalance) * 0.25).toFixed(2).toString())
              checkIfApprovalNeeded()
            }}
            variant={depositPercentage === 25 ? 'default' : 'outline'}
            size="sm"
            className="rounded-lg"
          >
            25%
          </Button>
          <Button
            onClick={() => {
              setDepositPercentage(50)
              setAmount((parseFloat(assetBalance) * 0.5).toFixed(2).toString())
              checkIfApprovalNeeded()
            }}
            variant={depositPercentage === 50 ? 'default' : 'outline'}
            size="sm"
            className="rounded-lg"
          >
            50%
          </Button>
          <Button
            onClick={() => {
              setDepositPercentage(75)
              setAmount((parseFloat(assetBalance) * 0.75).toFixed(2).toString())
              checkIfApprovalNeeded()
            }}
            variant={depositPercentage === 75 ? 'default' : 'outline'}
            size="sm"
            className="rounded-lg"
          >
            75%
          </Button>
          <Button
            onClick={() => {
              setDepositPercentage(100)
              setAmount(parseFloat(assetBalance).toFixed(2).toString())
              checkIfApprovalNeeded()
            }}
            variant={depositPercentage === 100 ? 'default' : 'outline'}
            size="sm"
            className="rounded-lg"
          >
            100%
          </Button>
        </div>
        {balanceError && (
          <p className="ml-2 text-xs text-red-600">{balanceError}</p>
        )}

        <div className="container-gray-borders flex flex-col gap-2">
          <p className="text-lg font-semibold">Resumen transacción</p>
          <div>
            <div className="flex items-center justify-between text-base">
              <span>Cantidad a depositar:</span>
              <div>
                <span>{amount ? amount : 0}</span>
                <span className="ml-2 text-sm">MXN</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-base">
              <span>Balance actual:</span>
              <div>
                <span>{parseFloat(assetBalance).toFixed(2)}</span>
                <span className="ml-2 text-sm">MXN</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-base">
              <span>Autorizado:</span>
              <div>
                <span>{parseFloat(assetAllowanceState).toFixed(2)}</span>
                <span className="ml-2 text-sm">MXN</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 pt-4">
          {requiresApproval ? (
            isApprovalLoading ? (
              <Button
                variant="secondary"
                size="lg"
                className="font-medium"
                onClick={handleApproval}
                disabled={
                  isApprovalPending || !requiresApproval || isApprovalLoading
                }
              >
                {isApprovalLoading ? (
                  <span className="flex items-center gap-x-2">
                    Autorizando...
                    <LoaderCircle className="h-6 w-6 animate-spin text-white" />
                  </span>
                ) : (
                  'Autorizar'
                )}
              </Button>
            ) : isApprovalTxSuccess ? (
              <Button
                size="lg"
                onClick={handleSupply}
                disabled={isDepositPending || balanceError !== null}
              >
                {isDepositPending ? (
                  <span className="flex items-center gap-x-2">
                    Depositando...
                    <LoaderCircle className="h-6 w-6 animate-spin text-white" />
                  </span>
                ) : (
                  'Depositar'
                )}
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="lg"
                className="font-medium"
                onClick={handleApproval}
                disabled={isApprovalPending || !requiresApproval}
              >
                {isApprovalPending ? (
                  <span className="flex items-center gap-x-2">
                    Autorizando...
                    <LoaderCircle className="h-6 w-6 animate-spin text-white" />
                  </span>
                ) : (
                  'Autorizar'
                )}
              </Button>
            )
          ) : (
            <Button
              size="lg"
              onClick={handleSupply}
              disabled={
                isDepositPending || balanceError !== null || isDepositConfirming
              }
            >
              {isDepositPending || isDepositConfirming ? (
                <span className="flex items-center gap-x-2">
                  Depositando...
                  <LoaderCircle className="h-6 w-6 animate-spin text-white" />
                </span>
              ) : (
                'Depositar'
              )}
            </Button>
          )}
        </div>

        {isDepositError && (
          <div className="mt-6 flex flex-col gap-6">
            <div className="error-container text-center">
              <p className="text-xs sm:text-sm">
                Something went wrong.{' '}
                <span
                  onClick={() =>
                    navigator.clipboard
                      .writeText(error?.message || '')
                      .then(() => console.log('Error copied to clipboard'))
                      .catch((err) =>
                        console.error('Failed to copy error to clipboard', err),
                      )
                  }
                  className="cursor-pointer underline"
                >
                  Copy the error.
                </span>
              </p>
            </div>
          </div>
        )}

        {depositHash && (
          <div className="flex flex-col items-center pt-4">
            <Link
              className="flex items-center gap-x-1.5 text-lg hover:text-primary"
              href={`https://basescan.org/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver en explorador <ExternalLinkIcon className="h4 w-4" />
            </Link>
            {isDepositConfirming && <p className="text-lg">Enviando...</p>}
            {isDepositConfirmed && (
              <p className="text-lg">Transacción enviada</p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
