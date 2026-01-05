import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../domain";

class UserStore {
  private readonly currentUser$ = new BehaviorSubject<User | null>(null);
  private readonly isAuthenticated$ = new BehaviorSubject<boolean>(false);

  getCurrentUser(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }

  getIsAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  setUser(user: User | null): void {
    this.currentUser$.next(user);
    this.isAuthenticated$.next(!!user);
  }

  clearUser(): void {
    this.currentUser$.next(null);
    this.isAuthenticated$.next(false);
  }

  getCurrentUserValue(): User | null {
    return this.currentUser$.value;
  }

  getIsAuthenticatedValue(): boolean {
    return this.isAuthenticated$.value;
  }
}

export const userStore = new UserStore();
export const {
  getCurrentUser,
  getIsAuthenticated,
  setUser,
  clearUser,
  getCurrentUserValue,
  getIsAuthenticatedValue,
} = userStore;
