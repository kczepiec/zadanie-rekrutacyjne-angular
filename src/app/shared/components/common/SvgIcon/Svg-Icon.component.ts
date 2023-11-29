import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { SafeHtmlPipe } from '../../../pipes/SafeHtml.pipe';
import { IconsService } from '../../../services/Icons.service';

@Component({
  selector: 'svg-icon',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe],
  template:
    '@if(isBrowser){<svg [innerHTML]="svgContent | safeHtml" class="w-full h-full"></svg>}',
  styleUrls: ['./Svg-Icon.component.scss'],
})
export class SvgIconComponent implements OnInit, OnDestroy {
  @Input() iconName: string = '';
  public svgContent: string = '';
  public isBrowser: boolean;

  private destroy$: Subject<void> = new Subject<void>();

  protected iconSvg$!: Subscription;

  constructor(
    private iconsService: IconsService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.iconSvg$ = this.iconsService
      .getSvg(this.iconName)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (svg) => (this.svgContent = svg),
        (err) => console.error(`Error loading SVG: ${this.iconName}`, err)
      );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
