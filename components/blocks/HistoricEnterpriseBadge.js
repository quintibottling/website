import Image from "next/image";
import translate from "lib/locales";

export default function HistoricEnterpriseBadge({ locale }) {
  return (
    <div className="inline-flex items-center gap-4 rounded-2xl bg-white/[0.06] p-4 xl:gap-5 xl:p-5">
      <Image
        src="/logo/camere-di-commercio.webp"
        alt={translate("historicEnterpriseLogoAlt", locale)}
        width={64}
        height={64}
        className="rounded-[2px] border border-white/25"
      />
      <div className="max-w-[200px] xl:max-w-[230px]">
        <div className="text-xs uppercase tracking-wide text-white">
          {translate("historicEnterprise", locale)}
        </div>
        <div className="text-xs text-white/60">
          {translate("historicEnterpriseRegister", locale)}
        </div>
      </div>
    </div>
  );
}
