export const isVisible = (currentPage) => {
  let visibility = '', viewport = $( window ).width()

  currentPage.name === 'favourites' || viewport > 800 ? visibility = 'visible'  : visibility = 'hidden'
  $('.favourites-container').css({'visibility':visibility})
}
