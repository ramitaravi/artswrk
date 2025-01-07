import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { FaHome, FaBriefcase, FaCalendar, FaEnvelope, FaChevronDown, FaUser, FaWallet } from 'react-icons/fa';

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: FaHome
  },
  {
    label: 'Jobs',
    href: '/jobs',
    icon: FaBriefcase
  },
  {
    label: 'Bookings',
    href: '/bookings',
    icon: FaCalendar
  },
  {
    label: 'Messages',
    href: '/messages',
    icon: FaEnvelope
  }
];

export default function ArtistNavbar() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [profilePic, setProfilePic] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updateUserInfo() {
      // Get user info from localStorage
      const storedUser = localStorage.getItem('impersonatedUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserId(user.id);
        setProfilePic(user.profilepicture || '');
      }
    }

    // Initial update
    updateUserInfo();

    // Listen for storage changes
    window.addEventListener('storage', updateUserInfo);
    // Listen for custom event for same-tab updates
    window.addEventListener('impersonatedUserChanged', updateUserInfo);

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('storage', updateUserInfo);
      window.removeEventListener('impersonatedUserChanged', updateUserInfo);
    };
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/dashboard" className="text-xl font-bold text-[#ec008c]">
              Artist Portal
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-1 py-2 text-sm font-medium transition-colors relative group
                    ${isActive 
                      ? 'text-[#ec008c]' 
                      : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ec008c]" />
                  )}
                  
                  {/* Hover Indicator */}
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200 transform origin-left transition-transform duration-200 ease-out
                    ${isActive ? 'scale-x-0' : 'scale-x-0 group-hover:scale-x-100'}`} 
                  />
                </Link>
              );
            })}
          </div>

          {/* Profile Section */}
          <div className="flex items-center space-x-4">
            {/* Wallet Button */}
            <Link
              href="/payment"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FaWallet className="w-4 h-4 mr-2" />
              Wallet
            </Link>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {profilePic ? (
                    <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm font-medium text-gray-600">A</span>
                  )}
                </div>
                <FaChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <Link
                      href={`/profile/${userId}`}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaUser className="w-4 h-4 mr-2" />
                      View Profile
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 