import { useTranslation } from "react-i18next";

export function SwitchLang() {
  const { i18n } = useTranslation();

  return (
    <label className='themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md'>
      <input
        type='checkbox'
        className='sr-only'
      />
      <span
        onClick={() => i18n.changeLanguage('vi')}
        className="flex items-center space-x-[6px] rounded py-2 px-[10px] font-medium"
      >
        VI
      </span>
      <span
        onClick={() => i18n.changeLanguage('en')}
        className="flex items-center space-x-[6px] rounded py-2 px-[10px] text-sm font-medium"
      >
        EN
      </span>
      </label>
  );
}
