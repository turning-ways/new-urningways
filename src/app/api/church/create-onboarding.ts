import api from '@/lib/axios';

interface churchOnboarding {
  churchEmail: string;
  churchPhone: string;
  churchName: string;
  churchAddress: string;
  churchCity: string;
  churchState: string;
  churchCountry: string;
  churchZip: string;
  churchWebsite: string | undefined;
  denomination: string;
  parentChurchId?: string;
  parentChurchLevelId?: string;
  isParent: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  hearAboutUs: string;
  dob: Date;
  gender: string;
}

export const createOnboarding = async (data: churchOnboarding) => {
  try {
    const response = await api.post('/churches/create-church-onboarding', data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response.data,
    };
  }
};
