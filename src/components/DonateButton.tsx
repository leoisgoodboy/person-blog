'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';


// useWriteContract 钩子允许对智能合约数据进行修改
// useWaitForTransactionReceipt 会等待交易被添加到区块中并且返回交易信息
// useAccount获取已经链接的数据

const CONTRACT_ADDRESS = '0x674149df6EE1c9D6c2Ace2650F5D38F594b1F266' as const;

const CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "donate",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "donor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "DonationReceived",
    "type": "event"
  }
] as const;

export default function DonateButton() {
  const { isConnected } = useAccount();
  const [amount, setAmount] = useState('0.01');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: hash, writeContract, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleDonate = async () => {
    try {
      // 执行合约上的写入操作
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'donate',
        value: parseEther(amount),  // parseEther把“人类可读的 ETH 数量”转成“链上使用的 wei（BigInt）”
      });
      // 为什么一定要用parseEther？  Solidity / EVM 不认识小数；链上统一使用 wei；JS 的 number 精度不安全
    } catch (error) {
      console.error('捐赠失败:', error);
      alert('捐赠失败，请检查控制台获取详细信息');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        💰 捐赠
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">💖 感谢您的支持</h2>
            
            {!isConnected ? (
              <p className="text-gray-600 mb-4">请先连接钱包</p>
            ) : isSuccess ? (
              <div className="text-center">
                <p className="text-green-600 font-bold mb-2">✅ 捐赠成功！</p>
                <p className="text-gray-600 mb-4">感谢您的慷慨支持！</p>
              </div>
            ) : (
              <>
                <p className="text-gray-600 mb-4">请输入您想要捐赠的金额（ETH）</p>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    捐赠金额 (ETH)
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    min="0.001"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0.01"
                  />
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={handleDonate}
                    disabled={isPending || isConfirming}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPending || isConfirming ? '处理中...' : '确认捐赠'}
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition-all duration-300"
                  >
                    取消
                  </button>
                </div>
              </>
            )}
            
            {isSuccess && (
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition-all duration-300"
              >
                关闭
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
