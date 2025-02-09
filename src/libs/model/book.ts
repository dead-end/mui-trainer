import { TBook, TGithubConfig } from '../types';
import { githubGetUrl, githubReadContent } from '../utils/github';
import Result from '../utils/result';

export const bookListing = async (config: TGithubConfig) => {
  const url = githubGetUrl(
    config.user,
    config.repo,
    'books/listing.books.json'
  );

  const result = new Result<TBook[]>();

  const readResult = await githubReadContent(url, config.token);
  if (readResult.hasError()) {
    return result.setError(
      `repoReadBackup - unable to read data: ${readResult.getMessage()}`
    );
  }

  const value: TBook[] = JSON.parse(readResult.getValue().content);
  return result.setOk(value);
};
