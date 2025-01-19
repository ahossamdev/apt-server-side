export class SupabaseUploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SupabaseUploadError";
  }
}
