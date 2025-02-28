import { TBook, TChapter, TGithubConfig } from '../types';
import { cacheDeletePath, cachedGetPath, cachePutPath } from '../utils/cache';
import { githubGetHash, githubGetUrl } from '../utils/github';
import Result from '../utils/result';

const PATH = 'books/listing.books.json';

/**
 * The function reads the file with the book array.
 */
export const bookListing = async (config: TGithubConfig) => {
  const result = new Result<TBook[]>();

  //
  // Get the book list, from cache or from github.
  //
  const cachedResult = await cachedGetPath<TBook[]>(config, PATH);
  if (cachedResult.hasError()) {
    return result.setError(cachedResult.getMessage());
  }

  return result.setOk(cachedResult.getValue().data);
};

/**
 * The function returns a book with a given id.
 */
export const bookGet = async (config: TGithubConfig, id: string) => {
  const result = new Result<TBook>();

  //
  // Get the book list, from cache or from github.
  //
  const cachedResult = await cachedGetPath<TBook[]>(config, PATH);
  if (cachedResult.hasError()) {
    return result.setError(cachedResult.getMessage());
  }

  //
  // Search the book.
  //
  const book = cachedResult.getValue().data.find((b) => b.id === id);
  if (!book) {
    return result.setError(`Not found: ${id}`);
  }
  return result.setOk(book);
};

/**
 * The function adds a book to the array and writes the result to the file.
 */
export const bookCreate = async (config: TGithubConfig, book: TBook) => {
  const result = new Result<TBook[]>();

  //
  // Get the book list, from cache or from github.
  //
  const resultCache = await cachedGetPath<TBook[]>(config, PATH);
  if (resultCache.hasError()) {
    return result.setError(resultCache.getMessage());
  }

  //
  // Add the new book to the list
  //
  let books = resultCache.getValue().data;
  if (books.find((b) => b.id === book.id)) {
    return result.setError('Id already exists!');
  }
  books.push(book);

  //
  // Write the new book list to github and update the cache.
  //
  const resultPut = await cachePutPath<TBook[]>(
    config,
    PATH,
    books,
    resultCache.getValue().hash,
    `Adding book: ${book.id}`
  );
  if (resultPut.hasError()) {
    return result.setError(resultPut.getMessage());
  }

  //
  // Get the hash value of the chapter list from github. This is void if the
  // file does not exist.
  //
  // TODO: Why github funtion is used here?
  const path = `books/${book.id}/listing.chapters.json`;
  const url = githubGetUrl(config.user, config.repo, path);
  const resultHash = await githubGetHash(url, config.token);
  if (resultHash.hasError()) {
    return result.setError(resultHash.getMessage());
  }

  //
  // Write the empty chapter list for the new file.
  //
  const resultChap = await cachePutPath<TChapter[]>(
    config,
    path,
    [],
    resultHash.getValue(),
    'Creating chapters!'
  );
  if (resultChap.hasError()) {
    return result.setError(resultChap.getMessage());
  }

  return result;
};

/**
 * The function updates a book to the array and writes the result to the file.
 */
export const bookUpdate = async (config: TGithubConfig, book: TBook) => {
  const result = new Result<TBook[]>();

  //
  // Get the book list, from cache or from github.
  //
  const resultCache = await cachedGetPath<TBook[]>(config, PATH);
  if (resultCache.hasError()) {
    return result.setError(resultCache.getMessage());
  }

  //
  // Remove the book from the list and add the new version.
  //
  let books = resultCache.getValue().data;
  books = books.filter((b) => b.id !== book.id);
  books.push(book);

  //
  // Write the new book list to github and update the cache.
  //
  return await cachePutPath<TBook[]>(
    config,
    PATH,
    books,
    resultCache.getValue().hash,
    `Updating book: ${book.id}`
  );
};

/**
 * The function removes a book from the book list and deletes the coresponding
 * chapter list.
 */
export const bookDelete = async (config: TGithubConfig, id: string) => {
  const result = new Result<TBook[]>();

  //
  // Get the book list, from cache or from github.
  //
  const resultCache = await cachedGetPath<TBook[]>(config, PATH);
  if (resultCache.hasError()) {
    return result.setError(resultCache.getMessage());
  }

  //
  // Remove the book from the list
  //
  let books = resultCache.getValue().data;
  const len = books.length;
  books = books.filter((b) => b.id !== id);
  if (len === books.length) {
    return result.setError(`Not found: ${id}`);
  }

  //
  // Write the new book list to github and update the cache.
  //
  const resultPut = await cachePutPath<TBook[]>(
    config,
    PATH,
    books,
    resultCache.getValue().hash,
    `Deleting book ${id}`
  );
  if (resultPut.hasError()) {
    return result.setError(resultPut.getMessage());
  }

  //
  // Delete the chapter list of the book from github and from cache.
  //
  const resultDelete = await cacheDeletePath(
    config,
    `books/${id}/listing.chapters.json`,
    `Deleting file.`
  );
  if (resultDelete.hasError()) {
    return result.setError(resultDelete.getMessage());
  }

  return result.setOk(books);
};
