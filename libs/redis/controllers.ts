export class RedisApi {
  static async getUserData() {
    try {
      await fetch('/api/redis', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Error fetching data from Redis:', error);
    }
  }

  static async setUserData(userId, data) {
    const key = `user:${userId}`;
    try {
      await fetch('/api/redis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: key, value: data })
      });
    } catch (error) {
      console.error('Error setting data in Redis:', error);
    }
  }
}