export abstract class LudiekFeature<API> {
  abstract readonly name: string;

  protected _api!: API;

  public init(api: API) {
    this._api = api;
  }

  /**
   * Called every tick
   * @param delta how much time has passed in seconds
   */
  update?(delta: number): void;

  // TODO(@Isha): Add persistence
}
