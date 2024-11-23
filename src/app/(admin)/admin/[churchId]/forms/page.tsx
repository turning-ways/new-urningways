/* eslint-disable @next/next/no-img-element */
export default function Page() {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <h2 className="uppercase text-5xl font-semibold">Coming Soon</h2>
          <p className="text-lg text-textDark">Stay tuned for something amazing</p>
          <div className="max-w-xl w-full">
              <img src="/assets/images/coming-soon.svg" alt="Coming Soon"/>
          </div>
        </div>
      </div>
    );
  }
  