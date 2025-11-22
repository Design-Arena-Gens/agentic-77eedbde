"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import { clsx } from "clsx";

type CosmicPalette = {
  id: string;
  name: string;
  gradient: string;
  halo: string;
  accent: string;
  highlight: string;
};

const palettes: CosmicPalette[] = [
  {
    id: "astral-gold",
    name: "الذهب الكوني",
    gradient:
      "linear-gradient(135deg, rgba(11, 15, 35, 0.95) 0%, rgba(18, 24, 58, 0.98) 45%, rgba(27, 35, 81, 1) 100%)",
    halo: "0 0 120px rgba(251, 215, 122, 0.28)",
    accent: "#f7c651",
    highlight: "rgba(247, 198, 81, 0.35)"
  },
  {
    id: "nebula-emerald",
    name: "سديم الزمرد",
    gradient:
      "linear-gradient(135deg, rgba(8, 25, 31, 0.98) 0%, rgba(16, 52, 65, 0.98) 50%, rgba(30, 81, 96, 1) 100%)",
    halo: "0 0 120px rgba(80, 255, 220, 0.22)",
    accent: "#56ffe0",
    highlight: "rgba(86, 255, 224, 0.25)"
  },
  {
    id: "violet-singularity",
    name: "تفرد بنفسجي",
    gradient:
      "linear-gradient(135deg, rgba(22, 9, 41, 0.98) 0%, rgba(51, 16, 86, 0.98) 55%, rgba(71, 22, 116, 1) 100%)",
    halo: "0 0 120px rgba(207, 160, 255, 0.26)",
    accent: "#cba3ff",
    highlight: "rgba(203, 163, 255, 0.22)"
  }
];

const sigils = [
  { id: "stellaris", glyph: "⟐", label: "نجمة متداخلة" },
  { id: "alchemy", glyph: "🜂", label: "رمز كيميائي" },
  { id: "portal", glyph: "⧉", label: "بوابة كونية" },
  { id: "radiant", glyph: "✴", label: "شعاع غامض" },
  { id: "sun-moon", glyph: "☉", label: "شمس كونية" }
];

const mysticThemes = [
  "طاقة النقطة الصفرية",
  "هندسة الوفرة الخفية",
  "شفرات التزامن الكوني",
  "بوابة الحظ المكتوب",
  "خريطة الثراء المتعدد الأبعاد"
];

const defaultState = {
  title: "مفاتيح السمو الخفي",
  subtitle: "رحلة في أسرار الثراء والكون",
  author: "بقلم: حكيم الطاقات الخفية",
  mantra: mysticThemes[0]
};

export function BookCoverDesigner() {
  const [title, setTitle] = useState(defaultState.title);
  const [subtitle, setSubtitle] = useState(defaultState.subtitle);
  const [author, setAuthor] = useState(defaultState.author);
  const [mantra, setMantra] = useState(defaultState.mantra);
  const [paletteId, setPaletteId] = useState(palettes[0].id);
  const [sigilId, setSigilId] = useState(sigils[0].id);
  const [isPending, startTransition] = useTransition();
  const [isDownloading, setIsDownloading] = useState(false);

  const coverRef = useRef<HTMLDivElement>(null);

  const palette = useMemo(
    () => palettes.find((item) => item.id === paletteId) ?? palettes[0],
    [paletteId]
  );

  const sigil = useMemo(
    () => sigils.find((item) => item.id === sigilId) ?? sigils[0],
    [sigilId]
  );

  const randomizeTheme = () => {
    startTransition(() => {
      const randomPalette =
        palettes[Math.floor(Math.random() * palettes.length)];
      const randomSigil = sigils[Math.floor(Math.random() * sigils.length)];
      const randomTheme =
        mysticThemes[Math.floor(Math.random() * mysticThemes.length)];
      setPaletteId(randomPalette.id);
      setSigilId(randomSigil.id);
      setMantra(randomTheme);
    });
  };

  const downloadCover = async () => {
    if (!coverRef.current) return;
    try {
      setIsDownloading(true);
      const domToImage = (await import("dom-to-image-more")).default;
      const blob = await domToImage.toPng(coverRef.current, {
        height: 720,
        width: 480,
        cacheBust: true,
        style: {
          transform: "scale(1)",
          filter: "none"
        }
      });
      const link = document.createElement("a");
      link.download = `غلاف-أسرار-الثراء-والكون.png`;
      link.href = blob;
      link.click();
    } catch (error) {
      console.error("تعذر تحميل الغلاف كصورة:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12 lg:flex-row lg:gap-10">
      <div className="flex flex-1 flex-col gap-6">
        <header className="space-y-3 text-right">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-sm font-medium text-white/80 shadow-sm backdrop-blur">
            <span className="text-lg">✧</span>
            غلاف كتاب غامض مستوحى من أسرار الثراء والكون
          </p>
          <h1 className="font-display text-4xl leading-tight text-white md:text-5xl">
            اصنع غلافك المضيء
          </h1>
          <p className="max-w-xl text-base text-white/70">
            عدل العناوين والرموز والألوان لتبتكر غلافًا ساحرًا ينسج الغموض مع
            وعد الثراء. عند الاكتمال، نزّل التصميم بصيغة صورة عالية الدقة.
          </p>
        </header>

        <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur">
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-white/80">
              عنوان الكتاب
            </label>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="اكتب عنوانًا غامضًا..."
              className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-right text-base text-white placeholder:text-white/40 focus:border-aurora-500 focus:outline-none focus:ring-2 focus:ring-aurora-500/40"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-white/80">
              العبارة المرافقة
            </label>
            <input
              value={subtitle}
              onChange={(event) => setSubtitle(event.target.value)}
              placeholder="سطر يلمح إلى أسرار الثراء..."
              className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-right text-base text-white placeholder:text-white/40 focus:border-aurora-500 focus:outline-none focus:ring-2 focus:ring-aurora-500/40"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-white/80">
              اسم المؤلف
            </label>
            <input
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              placeholder="وقّع الغلاف باسم حكيمك المفضل..."
              className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-right text-base text-white placeholder:text-white/40 focus:border-aurora-500 focus:outline-none focus:ring-2 focus:ring-aurora-500/40"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-white/80">
              تعويذة جانبية
            </label>
            <input
              value={mantra}
              onChange={(event) => setMantra(event.target.value)}
              placeholder="عبارة قصيرة تحمل سرًا كونيًا..."
              className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-right text-base text-white placeholder:text-white/40 focus:border-aurora-500 focus:outline-none focus:ring-2 focus:ring-aurora-500/40"
            />
          </div>

          <div className="grid gap-2">
            <span className="text-sm font-semibold text-white/80">
              لوحة الألوان
            </span>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {palettes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPaletteId(item.id)}
                  className={clsx(
                    "group relative overflow-hidden rounded-xl border px-4 py-3 text-right transition",
                    paletteId === item.id
                      ? "border-white/60 bg-white/10"
                      : "border-white/10 bg-white/5 hover:border-white/30"
                  )}
                >
                  <span className="text-sm font-semibold text-white/80">
                    {item.name}
                  </span>
                  <span
                    aria-hidden
                    className="mt-2 block h-10 rounded-lg shadow-inner"
                    style={{ backgroundImage: item.gradient }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <span className="text-sm font-semibold text-white/80">
              الرمز الطلسمي
            </span>
            <div className="flex flex-wrap gap-2">
              {sigils.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSigilId(item.id)}
                  className={clsx(
                    "flex min-w-[80px] flex-1 items-center justify-between rounded-xl border px-4 py-2 text-sm transition",
                    sigilId === item.id
                      ? "border-white/60 bg-white/15 text-white"
                      : "border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
                  )}
                >
                  <span>{item.label}</span>
                  <span className="text-xl">{item.glyph}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={randomizeTheme}
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-aurora-500/60 hover:bg-aurora-500/10 disabled:opacity-60"
            >
              <span className="text-lg">🜁</span>
              توليد غموض جديد
            </button>
            <button
              type="button"
              onClick={downloadCover}
              disabled={isDownloading}
              className="inline-flex items-center gap-2 rounded-xl border border-aurora-600 bg-aurora-600 px-5 py-2.5 text-sm font-semibold text-twilight-900 transition hover:bg-aurora-500 disabled:cursor-not-allowed disabled:bg-aurora-700/60"
            >
              <span className="text-lg">⬇</span>
              {isDownloading ? "جاري التحميل..." : "تحميل الغلاف"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="relative">
          <div
            ref={coverRef}
            className="cosmic-noise relative h-[720px] w-[480px] overflow-hidden rounded-[2.75rem] border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.45)]"
            style={{
              backgroundImage: palette.gradient,
              boxShadow: palette.halo
            }}
          >
            <div className="absolute inset-0">
              <div
                className="absolute -top-24 right-1/3 h-64 w-64 rounded-full blur-3xl"
                style={{ background: palette.highlight }}
              />
              <div
                className="absolute bottom-10 left-1/4 h-40 w-40 rounded-full blur-2xl"
                style={{ background: palette.highlight }}
              />
            </div>

            <div className="relative flex h-full flex-col">
              <div className="flex items-center justify-between px-10 pt-10 text-sm text-white/60">
                <span className="tracking-[0.35em]">LUX ARCANA</span>
                <span className="tracking-[0.35em]">CODex 77E</span>
              </div>

              <div className="mt-20 flex flex-col items-center gap-6 px-12 text-center">
                <span
                  className="text-6xl"
                  style={{ color: palette.accent }}
                  aria-hidden
                >
                  {sigil.glyph}
                </span>
                <h2
                  className="font-display text-4xl leading-snug text-white md:text-5xl"
                  style={{ textShadow: "0 10px 30px rgba(0,0,0,0.35)" }}
                >
                  {title}
                </h2>
                <p className="text-lg text-white/75">{subtitle}</p>
              </div>

              <div className="mt-auto flex flex-col gap-6 px-12 pb-14 text-right">
                <div className="rounded-lg border border-white/15 bg-white/5 px-5 py-4 text-sm text-white/70">
                  {mantra}
                </div>
                <div className="flex items-center justify-between text-white/70">
                  <span>طبعة النور الكامن</span>
                  <span className="font-semibold text-white">{author}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute -inset-6 rounded-[3rem] border border-white/10 opacity-70 blur-xl" />
        </div>
      </div>
    </section>
  );
}
