export const handleScrollToDiv = (
  id: string,
  block?: 'start' | 'center' | 'end' | 'nearest' | 'header-top',
) => {
  const targetDiv = document?.getElementById(id);
  if (targetDiv) {
    if (block === 'header-top') {
      const offset = window?.screen?.width >= 760 ? 50 : 160;
      const ele =
        targetDiv?.getBoundingClientRect?.()?.top + window?.scrollY - offset;
      if (ele) {
        window?.scrollTo?.({behavior: 'smooth', top: ele});
      }
    } else {
      targetDiv?.scrollIntoView?.({
        behavior: 'smooth',
        block: block || 'start',
      });
    }
  }
};