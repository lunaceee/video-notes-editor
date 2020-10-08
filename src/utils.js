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
    return url.split("vimeo.com/")[1];
  }
}

export function isVimeo(url) {
  if (url.match(/vimeo/)) {
    return true
  } else {
    return false
  }
}

export function isYouTube(url) {
  if (url.match(/youtu/)) {
    return true
  } else {
    return false
  }
}

