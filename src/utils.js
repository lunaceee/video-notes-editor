// Check duplicated videos
export function getVideoId(url) {
  // YouTube url has two formats. one with "youtu.be" and one with "v" query
  if (url.match(/youtu\.be/)) {
    return url.split("youtu.be/")[1];
  }

  if (url.match(/v=/)) {
    return new URL(url).searchParams.get("v");
  }

  if (url.match(/vimeo\.com/)) {
    return url.split("video.com/")[1];
  }
}
