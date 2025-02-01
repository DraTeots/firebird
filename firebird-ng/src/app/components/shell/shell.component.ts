import {
  Component,
  HostListener,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  Type,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
// Angular Material imports for the top bar
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {ThemeSwitcherComponent} from "../theme-switcher/theme-switcher.component";

interface NavItem {
  label: string;
  route: string;
  external?: boolean;
  icon?: string;
  /** If true, shows up on wide screens directly. Otherwise in hamburger. */
  alwaysVisible?: boolean;
}

@Component({
  standalone: true,
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  imports: [
    CommonModule,
    // Material modules needed for the top bar
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ThemeSwitcherComponent,
    RouterLink
  ],
})
export class ShellComponent {

  /** The reference to the left container, for programmatic component creation */
  @ViewChild('leftPaneContainer', { read: ViewContainerRef, static: true })
  leftPaneContainer!: ViewContainerRef;

  /** The reference to the right container, for programmatic component creation */
  @ViewChild('rightPaneContainer', { read: ViewContainerRef, static: true })
  rightPaneContainer!: ViewContainerRef;

  /** Event emitted when the resizing of the left pane ends. Emits the new width. */
  @Output() onEndResizeLeft = new EventEmitter<number>();

  /** Event emitted when the resizing of the right pane ends. Emits the new width. */
  @Output() onEndResizeRight = new EventEmitter<number>();

  /** Event emitted when the visibility of the right panel is changed. */
  @Output() onVisibilityChangeRight = new EventEmitter<boolean>();

  /** Event emitted when the visibility of the left panel is changed. */
  @Output() onVisibilityChangeLeft = new EventEmitter<boolean>();

  /** Shell resizing logic */
  private isResizingLeft = false;
  private isResizingRight = false;
  leftPaneWidth = 250;
  rightPaneWidth = 250;
  isLeftPaneVisible = false;
  isRightPaneVisible = false;

  /** Top bar: whether the mobile menu is open */
  navOpen = false;
  /** Track current theme (light or dark) */
  isDarkTheme = false;

  /** Single place for nav items */
  navItems: NavItem[] = [
    { label: 'Display', route: '/display', icon: 'monitor', alwaysVisible: true },
    { label: 'Configure', route: '/config', icon: 'tune', alwaysVisible: true },
    { label: 'GitHub Repo', route: 'https://github.com/eic/firebird', external: true, icon: 'code' },
    { label: 'Submit Ideas', route: 'https://github.com/eic/firebird/issues', external: true, icon: 'feedback' },
  ];

  constructor(
    private router: Router
  ) {}

  /** Resizing logic for left pane */
  onMouseDownLeft(event: MouseEvent) {
    this.isResizingLeft = true;
    event.preventDefault();
  }

  /** Resizing logic for right pane */
  onMouseDownRight(event: MouseEvent) {
    this.isResizingRight = true;
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isResizingLeft) {
      const minWidth = 100;
      const maxWidth = window.innerWidth - this.rightPaneWidth - 100;
      const newWidth = event.clientX;
      this.leftPaneWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
      event.preventDefault();
    } else if (this.isResizingRight) {
      const minWidth = 100;
      const maxWidth = window.innerWidth - this.leftPaneWidth - 100;
      const newWidth = window.innerWidth - event.clientX;
      this.rightPaneWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
      event.preventDefault();
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    if (this.isResizingLeft) {
      this.isResizingLeft = false;
      this.onEndResizeLeft.emit(this.leftPaneWidth);
    }
    if (this.isResizingRight) {
      this.isResizingRight = false;
      this.onEndResizeRight.emit(this.rightPaneWidth);
    }
  }

  /** Programmatically add component to left pane */
  addComponentToLeftPane<T>(component: Type<T>, data?: Partial<T>): ComponentRef<T> {
    this.leftPaneContainer.clear();
    const componentRef = this.leftPaneContainer.createComponent(component);
    if (data) {
      Object.assign(componentRef.instance as object, data);
    }
    return componentRef;
  }

  /** Programmatically add component to right pane */
  addComponentToRightPane<T>(component: Type<T>, data?: Partial<T>): ComponentRef<T> {
    this.rightPaneContainer.clear();
    const componentRef = this.rightPaneContainer.createComponent(component);
    if (data) {
      Object.assign(componentRef.instance as object, data);
    }
    return componentRef;
  }

  toggleLeftPane() {
    this.isLeftPaneVisible = !this.isLeftPaneVisible;
    this.onVisibilityChangeLeft.emit(this.isLeftPaneVisible);
  }

  toggleRightPane() {
    this.isRightPaneVisible = !this.isRightPaneVisible;
    this.onVisibilityChangeRight.emit(this.isRightPaneVisible);
  }

  /** Toggle the mobile hamburger menu */
  toggleNavConfig() {
    this.navOpen = !this.navOpen;
  }

  /** Toggle light/dark theme */
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    document.documentElement.setAttribute('data-theme', this.isDarkTheme ? 'dark' : 'light');
  }

  /** Clicking a nav item => external link or internal route */
  onNavItemClick(item: NavItem) {
    if (item.external) {
      window.open(item.route, '_blank');
    } else {
      this.router.navigateByUrl(item.route);
    }
    this.navOpen = false;
  }
}
