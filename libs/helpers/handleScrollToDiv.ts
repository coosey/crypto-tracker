export const handleScrollToDiv = (
  id: string,
  block?: 'start' | 'center' | 'end' | 'nearest' | 'header-top',
) => {
  const targetDiv = document?.getElementById(id);
  if (targetDiv) {
    if (block === 'header-top') {
      const ele =
        targetDiv?.getBoundingClientRect?.()?.top + window?.scrollY;
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