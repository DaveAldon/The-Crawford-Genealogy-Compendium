export const Letters = () => {
  return (
    <div className="bg-transparent">
      <div className="relative isolate px-6 lg:px-8">
        <div
          className="absolute pointer-events-none inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
        <div className="mx-auto max-w-3xl pt-32 sm:pt-48">
          <div className="text-center">
            <p className="mt-6 text-2xl leading-8 text-white font-bold">
              There are family members who died long ago that we will never get
              the chance to meet. And yet, even now they speak to us uniquely
              through genealogies.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 flex-col lg:flex-row gap-8">
              <div>
                <div className="flex flex-row gap-4">
                  <img
                    src="/resources/images/Bertha.png"
                    alt="letters"
                    className="object-scale-down h-64 rounded-md"
                  />
                  <img
                    src="/resources/images/bertha-headshot.png"
                    alt="letters"
                    className="object-scale-down h-48 rounded-md"
                  />
                </div>
                <p className="text-white mt-4">
                  Bertha Addell Zimmerman 1880 - 1963
                </p>
              </div>
              <div>
                <div className="flex flex-row gap-4">
                  <img
                    src="/resources/images/Goldie.png"
                    alt="letters"
                    className="object-scale-down h-64 rounded-md"
                  />
                  <img
                    src="/resources/images/goldie-headshot.png"
                    alt="letters"
                    className="object-scale-down h-48 rounded-md"
                  />
                </div>
                <p className="text-white mt-4">Goldie Iva Mercer 1907 - 2001</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
        </div>
      </div>
    </div>
  );
};
