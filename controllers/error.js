exports.get404 = (req, res, next) => {
  console.log('TEST');
  res.status(400).render('404', { pageTitle: 'Page Not Found' });
};
