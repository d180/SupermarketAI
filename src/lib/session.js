import { cookies } from 'next/headers';

export const getSession = async () => {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user');

  if (!userCookie) {
    return null;
  }

  try {
    return JSON.parse(userCookie.value);
  } catch (error) {
    console.error('Error parsing user cookie:', error);
    return null;
  }
};

export const setSession = async (user) => {
  const cookieStore = await cookies();
  
  cookieStore.set('user', JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
};

export const clearSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('user');
}; 