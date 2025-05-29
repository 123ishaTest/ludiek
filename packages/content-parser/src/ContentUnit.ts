/**
 * A parsed unit of content.
 */
export interface ContentUnit {

  /**
   * The location of this unit of content, relative to the root.
   */
  path: string;

  /**
   * The type that this unit of content is.
   */
  type: string

  /**
   * The data that was parsed.
   */
  data: object
}