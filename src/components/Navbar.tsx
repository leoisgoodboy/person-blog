import Link from 'next/link';
import ConnectWallet from './ConnectWallet';
import DonateButton from './DonateButton';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">
            <Link href="/" className="text-gray-800 hover:text-blue-600">
              个人博客
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <div className="flex space-x-8">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                首页
              </Link>
              <Link 
                href="/categories" 
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                分类
              </Link>
              <Link 
                href="/new-posts" 
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                新文章
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <DonateButton />
              <ConnectWallet />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
