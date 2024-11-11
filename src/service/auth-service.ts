class AuthService {
  private static instance: AuthService;
  private signOutHandler: (() => Promise<void>) | null = null;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public setSignOutHandler(handler: () => Promise<void>) {
    this.signOutHandler = handler;
  }

  async signOut() {
    if (this.signOutHandler) {
      await this.signOutHandler();
    } else {
      console.log('No sign out handler set');
    }
  }
}

export const authService = AuthService.getInstance();
