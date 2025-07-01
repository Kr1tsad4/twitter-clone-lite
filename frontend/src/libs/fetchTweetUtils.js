const getTweet = async (url) => {
  try {
    const data = await fetch(`${url}/tweet`);
    const tweets = data.json();
    return tweets;
  } catch (e) {
    throw new Error("can not get tweets");
  }
};

const getTweetById = async (url, id) => {
  try {
    const data = await fetch(`${url}/tweet/${id}`);
    const user = data.json();
    return user;
  } catch (e) {
    if (data.status === 404) return undefined;
    throw new Error("can not get user");
  }
};

const getTweetByUserId = async (url, id) => {
  try {
    const data = await fetch(`${url}/tweet/user/${id}`);
    const tweet = data.json();
    return tweet;
  } catch (e) {
    if (data.status === 404) return undefined;
    throw new Error("can not get tweet from this user.");
  }
};

const createTweet = async (url, newTweet) => {
  try {
    const res = await fetch(`${url}/tweet`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...newTweet,
      }),
    });
    const createdTweet = await res.json();
    return createdTweet;
  } catch (e) {
    throw new Error("can not create tweet");
  }
};

const updateTweet = async (url, id, updateTweet) => {
  try {
    const res = await fetch(`${url}/tweet/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...updateTweet,
      }),
    });
    const updatedTweet = await res.json();
    return updatedTweet;
  } catch (e) {
    throw new Error("can not update tweet");
  }
};

const deleteTweet = async (url, id) => {
  try {
    const res = await fetch(`${url}/tweet/${id}`, {
      method: "DELETE",
    });
    return res.status;
  } catch (e) {
    throw new Error("can not delete tweet");
  }
};

export {
  getTweet,
  getTweetById,
  getTweetByUserId,
  createTweet,
  updateTweet,
  deleteTweet,
};