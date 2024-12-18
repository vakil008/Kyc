import React from 'react';
import { Wallet, AlertCircle } from 'lucide-react';
import { Button } from '../../shared/Button';
import type { RegistrationFormData } from '../../../types';

interface WalletConnectionStepProps {
  formData: RegistrationFormData;
  updateFormData: (data: Partial<RegistrationFormData>) => void;
}

export function WalletConnectionStep({ formData, updateFormData }: WalletConnectionStepProps) {
  const handleConnectWallet = async () => {
    try {
      // Simulated wallet connection
      const mockAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
      updateFormData({ walletAddress: mockAddress });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-700/50 p-6 rounded-lg">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-emerald-500/10 rounded-full">
            <Wallet className="h-6 w-6 text-emerald-500" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">Connect Your Wallet</h3>
            <p className="mt-2 text-sm text-gray-400">
              Connect your Ethereum wallet to securely store your verified identity
              on the blockchain. This wallet will be used for all future
              interactions with the platform.
            </p>
          </div>
        </div>
      </div>

      {!formData.walletAddress ? (
        <Button
          variant="primary"
          onClick={handleConnectWallet}
          className="w-full"
          icon={<Wallet className="w-4 h-4" />}
        >
          Connect Wallet
        </Button>
      ) : (
        <div className="bg-emerald-500/10 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <Wallet className="h-5 w-5 text-emerald-500" />
            <span className="text-sm font-medium text-emerald-500">
              Wallet Connected: {formData.walletAddress.slice(0, 6)}...
              {formData.walletAddress.slice(-4)}
            </span>
          </div>
        </div>
      )}

      <div className="flex items-start space-x-3 bg-blue-500/10 p-4 rounded-lg">
        <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-200">
          Make sure you're using a secure wallet that you have full control over.
          Never share your private keys with anyone.
        </p>
      </div>
    </div>
  );
}