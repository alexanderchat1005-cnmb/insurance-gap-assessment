"use client";

/* eslint-disable @next/next/no-img-element */

interface LandingProps {
  onStart: () => void;
}

export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="h-full flex flex-col bg-cream relative overflow-hidden">
      {/* Decorative brand shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-16 -left-20 w-72 h-72 rounded-full bg-peach opacity-30 blur-2xl" />
        <div className="absolute top-40 -right-24 w-80 h-80 rounded-full bg-teal opacity-15 blur-3xl" />
        <div className="absolute bottom-[-60px] left-[-40px] w-64 h-64 rounded-full bg-teal-soft opacity-20 blur-2xl" />
      </div>

      {/* Top nav with logo */}
      <div className="relative z-10 pt-8 px-6 flex items-center justify-center">
        <img
          src="/logo.svg"
          alt="柏泰 Better"
          className="h-7 w-auto"
          draggable={false}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 text-center">
        {/* Label */}
        <div className="mb-5 text-[11px] tracking-[0.25em] text-teal-mid font-medium">
          家 庭 保 障 自 测 工 具
        </div>

        {/* Big title */}
        <h1 className="text-4xl font-black text-teal tracking-wide mb-3 leading-tight">
          保障裸奔指数
        </h1>

        {/* Peach accent bar */}
        <div className="w-12 h-1 bg-peach rounded-full mb-6" />

        {/* Subtitle */}
        <p className="text-lg font-semibold text-gray-800 mb-3">
          测测你的人生，还能撑几集
        </p>
        <p className="text-sm text-gray-500 mb-10 leading-relaxed max-w-[280px]">
          13道灵魂拷问<br />
          3分钟看懂你的寿险 / 重疾 / 医疗 / 储蓄缺口
        </p>

        {/* CTA */}
        <button
          onClick={onStart}
          className="bg-teal text-white font-bold text-base px-12 py-4 rounded-full
            shadow-[0_8px_24px_rgba(0,89,86,0.25)]
            active:scale-95 transition-transform duration-150"
        >
          开始自测 →
        </button>

        {/* Stats row */}
        <div className="mt-10 flex items-center gap-5 text-[11px] text-gray-500">
          <div className="text-center">
            <div className="text-teal font-black text-base">6</div>
            <div>种保障人格</div>
          </div>
          <div className="w-px h-6 bg-gray-300" />
          <div className="text-center">
            <div className="text-teal font-black text-base">5</div>
            <div>维缺口分析</div>
          </div>
          <div className="w-px h-6 bg-gray-300" />
          <div className="text-center">
            <div className="text-peach-dark font-black text-base">3 分钟</div>
            <div>完成测评</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 pb-6 px-8 text-center">
        <p className="text-[10px] text-gray-400 leading-relaxed">
          本测试由 <span className="text-teal font-semibold">柏泰保险经纪 Better</span> 出品
        </p>
        <p className="text-[10px] text-gray-300 mt-1 leading-relaxed">
          仅为家庭保障意识自测参考，不构成保险销售或投资建议
        </p>
      </div>
    </div>
  );
}
