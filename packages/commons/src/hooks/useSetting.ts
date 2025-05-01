import { useSelect, select } from "@wordpress/data";


export const useSetting = (setting: string) => {
  return useSelect(() => {
    const settings = select('core/editor').getSettings();
    return settings[setting];
  }, []);
}

export const useSettingWithFallback = (setting: string, fallback: any) => {
    return useSetting(setting) ?? fallback;
}

