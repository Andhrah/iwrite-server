let readTime;

export default {
  blogReadTime: (articleBody) => {
    try {
      const defaultArticleLength = 250;
      const articleLength = articleBody.body.split(' ').length;
      if (articleLength <= defaultArticleLength) {
        readTime = '1 minute read';
        return readTime;
      }
      readTime = Math.round(articleLength / defaultArticleLength);
      if (readTime === 1) {
        return `${readTime} minute read`;
      }
      return `${readTime} minutes read`;
    } catch (err) {
      return err;
    }
  },
};
