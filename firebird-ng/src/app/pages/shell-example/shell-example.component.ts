// shell-example.component.ts
import {ChangeDetectionStrategy, Component, input, ViewChild} from '@angular/core';
import { ShellComponent } from '../../components/shell/shell.component';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
// Add if you're using <form> or ngModel, etc.
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ThemeSwitcherComponent} from "../../components/theme-switcher/theme-switcher.component";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {NgForOf, NgStyle} from "@angular/common";

interface Color {
  name: string;
  background: string;
  text: string;
  hideText?: boolean;
}

@Component({
  selector: 'theme-demo-colors',
  template: `
    <div class="demo-compact-color-container">
      @for (color of colors(); track $index) {
      <div class="demo-heading"
           [style.background-color]="'var(' + color.background + ')'"
           [style.color]="'var(' + color.text + ')'">
        <div class="demo-name"> {{color.name}} </div>
        <div class="demo-variables">
          <div class="demo-variable demo-code">{{color.background}}</div>
          @if (!color.hideText) {
      <div class="demo-variable demo-code">{{color.text}}</div>
      }
      </div>
    </div>
      }
    </div>
  `,
  styleUrl: 'shell-example.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ThemeDemoColors {
  colors = input<Color[]>();
}


@Component({
  selector: 'app-shell-example',
  imports: [
    ShellComponent,
    MatIcon,
    MatIconButton,
    MatLabel,
    MatButton,
    MatFormField,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ThemeSwitcherComponent,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatGridList,
    MatGridTile,
    NgStyle,
    NgForOf,
    ThemeDemoColors
  ],
  templateUrl: './shell-example.component.html',
  styleUrls: ['./shell-example.component.scss']
})
export class ShellExampleComponent {

  @ViewChild(ShellComponent)
  displayShellComponent!: ShellComponent;

  alternativeThemeColors: Color[] = [
    {
      name: 'Primary Container',
      background: '--mat-sys-primary-container',
      text: '--mat-sys-on-primary-container',
    },
    {
      name: 'Secondary',
      background: '--mat-sys-secondary',
      text: '--mat-sys-on-secondary',
    },
    {
      name: 'Secondary Container',
      background: '--mat-sys-secondary-container',
      text: '--mat-sys-on-secondary-container',
    },
    {
      name: 'Tertiary',
      background: '--mat-sys-tertiary',
      text: '--mat-sys-on-tertiary',
    },
    {
      name: 'Tertiary Container',
      background: '--mat-sys-tertiary-container',
      text: '--mat-sys-on-tertiary-container',
    },
    {
      name: 'Error Container',
      background: '--mat-sys-error-container',
      text: '--mat-sys-on-error-container',
    },
  ];

  surfaceColors: Color[] = [
    {
      name: 'Surface Dim',
      background: '--mat-sys-surface-dim',
      text: '--mat-sys-on-surface',
      hideText: true,
    },
    {
      name: 'Surface Bright',
      background: '--mat-sys-surface-bright',
      text: '--mat-sys-on-surface',
      hideText: true,
    },
    {
      name: 'Surface Container Lowest',
      background: '--mat-sys-surface-container-lowest',
      text: '--mat-sys-on-surface',
      hideText: true,
    },
    {
      name: 'Surface Container Low',
      background: '--mat-sys-surface-container-low',
      text: '--mat-sys-on-surface',
      hideText: true,
    },
    {
      name: 'Surface Container',
      background: '--mat-sys-surface-container',
      text: '--mat-sys-on-surface',
      hideText: true,
    },
    {
      name: 'Surface Container High',
      background: '--mat-sys-surface-container-high',
      text: '--mat-sys-on-surface',
      hideText: true,
    },
    {
      name: 'Surface Container Highest',
      background: '--mat-sys-surface-container-highest',
      text: '--mat-sys-on-surface',
      hideText: true,
    },
  ];

  fixedColors: Color[] = [
    {
      name: 'Primary Fixed',
      background: '--mat-sys-primary-fixed',
      text: '--mat-sys-on-primary-fixed',
    },
    {
      name: 'Primary Fixed Dim',
      background: '--mat-sys-primary-fixed-dim',
      text: '--mat-sys-on-primary-fixed',
    },
    {
      name: 'Secondary Fixed',
      background: '--mat-sys-secondary-fixed',
      text: '--mat-sys-on-secondary-fixed',
    },
    {
      name: 'Secondary Fixed Dim',
      background: '--mat-sys-secondary-fixed-dim',
      text: '--mat-sys-on-secondary-fixed',
    },
    {
      name: 'Tertiary Fixed',
      background: '--mat-sys-tertiary-fixed',
      text: '--mat-sys-on-tertiary-fixed',
    },
    {
      name: 'Tertiary Fixed Dim',
      background: '--mat-sys-tertiary-fixed-dim',
      text: '--mat-sys-on-tertiary-fixed',
    },
  ];

  toggleLeftPane() {
    this.displayShellComponent.toggleLeftPane();
  }

  toggleRightPane() {
    this.displayShellComponent.toggleRightPane();
  }

}
