
'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback } from 'react';

interface ProfileState {
  companyName: string;
  email: string;
  avatarPreview: string | null;
}

interface ProfileContextType extends ProfileState {
  updateProfile: (data: Partial<ProfileState>) => void;
}

const defaultProfileState: ProfileState = {
  companyName: 'Your Company LLC',
  email: 'contact@yourcompany.com',
  avatarPreview: null,
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ProfileState>(defaultProfileState);

  const updateProfile = useCallback((data: Partial<ProfileState>) => {
    setProfile((prevProfile) => ({ ...prevProfile, ...data }));
  }, []);

  return (
    <ProfileContext.Provider value={{ ...profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
