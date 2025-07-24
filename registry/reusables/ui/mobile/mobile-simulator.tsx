export interface MobileSimulatorProps {
  children?: React.ReactNode
}

export function MobileSimulator({ children }: MobileSimulatorProps) {
  return (
    <div className="hidden h-screen max-h-screen w-full items-center justify-center bg-slate-100 p-4 dark:bg-slate-900 sm:flex">
      <div className="mobile-simulator 2xls:h-[95vh] 5xl:h-[950px] 5xl:w-[460px] 5xl:rounded-[50px] relative h-[97vh] w-[375px] overflow-hidden rounded-[40px] border-8 border-black bg-background shadow-xl 2xl:w-[420px] 2xl:border-[10px]">
        <div className="absolute left-0 right-0 top-0 z-10 flex h-6 justify-center bg-black 2xl:h-8">
          <div className="5xl:w-40 h-4 w-32 rounded-b-xl bg-black 2xl:w-36"></div>
        </div>
        <div
          id="mobile-content-wrapper"
          className="mobile-content 5xl:pt-8 relative h-full overflow-y-auto pt-6"
        >
          {children}
        </div>
      </div>
    </div>
  )
}
