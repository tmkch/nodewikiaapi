/* global test, expect */

const WikiaAPI = require('../main')

test('limit is working', () => {
  expect.assertions(1)
  return new WikiaAPI('dev').getLatestActivity(10).then(data => {
    expect(data.items.length).toBe(10)
  })
})

test('LatestActivity must return an object', () => {
  expect.assertions(1)
  return new WikiaAPI('dev').getLatestActivity().then(data => {
    expect(typeof data).toBe('object')
  })
})

test('RecentlyChangedArticles must return an object', () => {
  expect.assertions(1)
  return new WikiaAPI('dev').getRecentlyChangedArticles().then(data => {
    expect(typeof data).toBe('object')
  })
})

test('ArticleAsSimpleJson must return an object', () => {
  expect.assertions(1)
  return new WikiaAPI('dev').getArticleAsSimpleJson({id: 12649}).then(data => {
    expect(typeof data).toBe('object')
  })
})

test('ArticleAsSimpleJson should catch on 404', () => {
  expect.assertions(1)
  return new WikiaAPI('dev').getArticleAsSimpleJson({id: 1}).catch(error => {
    expect(error.statusCode).toBe(404)
  })
})

test('ArticlesDetails must return an object', () => {
  expect.assertions(2)
  return new WikiaAPI('dev').getArticlesDetails({ids: 12649}).then(data => {
    expect(typeof data).toBe('object')
    expect(Object.keys(data.items).length).toBe(1)
  })
})

test('ArticlesDetails needs at least one generator', () => {
  expect(() => {
    new WikiaAPI('dev').getArticlesDetails()
  }).toThrow()
})

test('ArticlesDetails with space in title', () => {
  expect.assertions(1)

  const wikia = new WikiaAPI('dev')
  return Promise.all([wikia.getArticlesDetails({titles: 'Lua_templating/Basics'}), wikia.getArticlesDetails({titles: 'Lua templating/Basics'})]).then(data => {
    expect(Object.keys(data[0].items)).toEqual(Object.keys(data[1].items))
  })
})

test('ArticlesList must return an object', () => {
  expect.assertions(1)
  return new WikiaAPI('dev').getArticlesList().then(data => {
    expect(typeof data).toBe('object')
  })
})

test('ArticlesListExpanded must return an object', () => {
  expect.assertions(1)
  return new WikiaAPI('dev').getArticlesListExpanded().then(data => {
    expect(typeof data).toBe('object')
  })
})

test('ArticlesList and ArticlesListExpanded must return same articles', () => {
  expect.assertions(1)

  const wikia = new WikiaAPI('dev')
  return Promise.all([wikia.getArticlesList(), wikia.getArticlesListExpanded()]).then(data => {
    expect(Object.keys(data[0].items)).toEqual(Object.keys(data[1].items))
  })
})

test('MostLinkedArticles must return an object', () => {
  expect.assertions(1)
  return new WikiaAPI('dev').getMostLinked().then(data => {
    expect(typeof data).toBe('object')
  })
})

test('MostLinkedArticlesExpanded must return an object', () => {
  expect.assertions(1)
  return new WikiaAPI('dev').getMostLinkedExpanded().then(data => {
    expect(typeof data).toBe('object')
  })
})

test('MostLinkedArticles and MostLinkedArticlesExpanded must return same articles', () => {
  expect.assertions(1)

  const wikia = new WikiaAPI('dev')
  return Promise.all([wikia.getMostLinked(), wikia.getMostLinkedExpanded()]).then(data => {
    expect(Object.keys(data[0].items)).toEqual(Object.keys(data[1].items))
  })
})
