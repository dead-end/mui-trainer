import { TBook, TGithubConfig, TUpdater } from '../types';
import { cachedGetPath, cachePutPath } from '../utils/cache';
import Result from '../utils/result';

const PATH = 'books/listing.books.json';

/**
 * The function reads the file with the book array.
 */
export const bookListing = async (config: TGithubConfig) => {
  const result = new Result<TBook[]>();

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

  const resultListing = await bookListing(config);
  if (resultListing.hasError()) {
    return result.setError(resultListing.getMessage());
  }

  const book = resultListing.getValue().find((b) => b.id === id);
  if (!book) {
    return result.setError(`Not found: ${id}`);
  }
  return result.setOk(book);
};

/**
 * The function updates the array of books.
 */
const update = async <T>(config: TGithubConfig, fct: TUpdater<T>) => {
  const result = new Result<T>();

  const cacheResult = await cachedGetPath<T>(config, PATH);
  if (cacheResult.hasError()) {
    return result.setError(cacheResult.getMessage());
  }

  const fctResult = fct(cacheResult.getValue().data);
  if (fctResult.hasError()) {
    result.setError(fctResult.getMessage());
  }

  return await cachePutPath<T>(
    config,
    PATH,
    fctResult.getValue(),
    cacheResult.getValue().hash,
    'Updating book'
  );
};

/**
 * The function adds a book to the array and writes the result to the file.
 */
export const bookCreate = async (config: TGithubConfig, book: TBook) => {
  return update<TBook[]>(config, (books) => {
    const result = new Result<TBook[]>();
    if (books.find((b) => b.id === book.id)) {
      return result.setError('Id already exists!');
    }
    books.push(book);
    return result.setOk(books);
  });
};

/**
 * The function updates a book to the array and writes the result to the file.
 */
export const bookUpdate = async (config: TGithubConfig, book: TBook) => {
  return update<TBook[]>(config, (books) => {
    const result = new Result<TBook[]>();
    const newBooks = books.filter((b) => b.id !== book.id);
    newBooks.push(book);
    return result.setOk(newBooks);
  });
};

/**
 * The function removes a book from the array and writes the result to the
 * file.
 */
export const bookDelete = async (config: TGithubConfig, id: string) => {
  return update<TBook[]>(config, (books) => {
    const result = new Result<TBook[]>();
    const len = books.length;
    books = books.filter((b) => b.id !== id);
    if (len === books.length) {
      return result.setError(`Not found: ${id}`);
    }
    return result.setOk(books);
  });
};
