import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SafeHtmlPipe } from '../../../pipes/SafeHtml.pipe';
import { IconsService } from '../../../services/Icons.service';
@Component({
  selector: 'svg-icon',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
  template:
    `<svg [innerHTML]="svgContent | safeHtml" *ngIf="isBrowser" class="w-full h-full"></svg>`,
  styleUrls: ['./Svg-Icon.component.scss'],
})
export class SvgIconComponent implements OnInit {
  @Input() iconName: string = '';
  public svgContent: string = '';
  public isBrowser: boolean;

  private destroyRef = inject(DestroyRef);

  constructor(
    private iconsService: IconsService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.iconsService
      .getSvg(this.iconName)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (svg) => {
          this.svgContent = svg;
          this.cdr.detectChanges(); // Detect changes on route change
        },
        (err) => console.error(`Error loading SVG: ${this.iconName}`, err)
      );
  }
}
