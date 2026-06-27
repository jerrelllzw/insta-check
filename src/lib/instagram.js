// Expected filenames from the Instagram "Followers and following" export.
// Followers are paginated (~1k per file): followers_1.json, followers_2.json, …
export const FOLLOWERS_FILENAME = 'followers_1.json';
export const FOLLOWING_FILENAME = 'following.json';

// Matchers used to pick the right files out of a dropped folder / multi-select.
export const FOLLOWERS_PATTERN = /^followers(_\d+)?\.json$/i;
export const FOLLOWING_PATTERN = /^following\.json$/i;

const readJsonFile = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        resolve(JSON.parse(e.target.result));
      } catch {
        reject(new Error('That file isn\'t valid JSON.'));
      }
    };
    reader.onerror = () => reject(new Error('Couldn\'t read that file.'));
    reader.readAsText(file);
  });

// Each followers_N.json is an array of entries; the handle lives in string_list_data.
const parseFollowers = (data) =>
  data.map((entry) => entry.string_list_data[0].value);

// following.json wraps the list under relationships_following; handle is the title.
const parseFollowing = (data) =>
  data.relationships_following.map((entry) => entry.title);

/**
 * Compares the export files and returns who follows back and who doesn't.
 * `followersFiles` is an array so paginated followers_N.json files are merged.
 * Everything runs locally — files never leave the browser.
 */
export async function compareFollows(followersFiles, followingFile) {
  const [followersDatas, followingData] = await Promise.all([
    Promise.all(followersFiles.map(readJsonFile)),
    readJsonFile(followingFile),
  ]);

  let followers, following;
  try {
    followers = new Set(followersDatas.flatMap(parseFollowers));
    following = parseFollowing(followingData);
  } catch {
    throw new Error(
      'Those files don\'t look like an Instagram export. Double-check you uploaded the right ones.'
    );
  }

  const mutuals = following.filter((user) => followers.has(user)).sort();
  const notFollowingBack = following.filter((user) => !followers.has(user)).sort();

  return { mutuals, notFollowingBack };
}
