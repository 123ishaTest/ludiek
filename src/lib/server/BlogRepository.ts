import * as fs from 'node:fs';

export class BlogRepository {
  public static async getAll() {
    const files = fs.readdirSync('./static/blog/');

    return await files.map(async (file) => {
      return await this.getPost(file);
    });
  }

  public static async getPost(name: string) {
    return fs.readFileSync(`./static/blog/${name}`, {encoding: 'utf-8'});
  }
}
