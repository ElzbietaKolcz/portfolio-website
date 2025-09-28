const styles = {
  boxWidth: "xl:max-w-[1280px] w-full",

  heading1:
    "text-5xl md:text-6xl font-medium font-LifeSugarly pb-12 mt-12 md:pb-5 md:mt-4 lg:pb-4  lg:mb-4 leading-5  text-primary-100 whitespace-nowrap ss:text-[24px]",
  heading2:
    "font-Assistant  xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full",
  paragraph: "font-Assistant text-[18px] leading-[30px]",
  

  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-center items-start",

  paddingX: "sm:px-16 px-6",
  paddingY: "sm:pb-16 py-6",
  padding: "sm:px-16 px-6 sm:py-12 py-4",

  marginX: "sm:mx-16 mx-6",
  marginY: "sm:my-16 my-6",

  bgAnimation:
    "h-[160px] md:h-[250px] bg-fixed bg-cover bg-center bg-no-repate  lg:my-20",
};

export const layout = {
  section: `flex md:flex-row flex-col ${styles.paddingY}`,
  sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

  sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
  sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

  sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
};

export default styles;
