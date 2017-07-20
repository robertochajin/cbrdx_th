import { join } from 'path';

import { SeedConfig } from './seed.config';
import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export const FONT_AWESOME_SRC = 'node_modules/font-awesome/';
export class ProjectConfig extends SeedConfig {

   PROJECT_TASKS_DIR = join( process.cwd(), this.TOOLS_DIR, 'tasks', 'project' );

   FONTS_DEST = `${this.APP_DEST}/fonts`;
   CUSTOMFONTS_DEST = `${this.APP_DEST}/css/th`;
   FONTS_SRC = [
      'node_modules/font-awesome/fonts/**'
   ];
   CUSTOMFONTS_SRC = [
      'src/client/assets/font/th/**'
   ];

   PRIME_NG_THEME = 'bootstrap';
   THEME_FONTS_DEST = `${this.APP_DEST}/css/fonts`;
   THEME_FONTS_SRC = [
      'node_modules/primeng/resources/themes/' + this.PRIME_NG_THEME + '/fonts/**',
      // 'node_modules/font-awesome/fonts/**',
      'src/client/assets/font/sp/**',
   ];

   CSS_IMAGE_DEST = `${this.CSS_DEST}/images`;
   CSS_IMAGE_SRC = [
      'node_modules/primeng/resources/themes/' + this.PRIME_NG_THEME + '/images/**'
   ];

   constructor() {
      super();
      this.APP_TITLE = ' | Gestionamos';

      /* Enable typeless compiler runs (faster) between typed compiler runs. */
      // this.TYPED_COMPILE_INTERVAL = 5;

      // Add `NPM` third-party libraries to be injected/bundled.
      this.NPM_DEPENDENCIES = [
         ...this.NPM_DEPENDENCIES,
         { src: 'jquery/dist/jquery.min.js', inject: 'libs' },
         { src: 'bootstrap/dist/js/bootstrap.min.js', inject: 'libs' },
         { src: 'bootstrap/dist/css/bootstrap.min.css', inject: true },
         { src: 'font-awesome/css/font-awesome.min.css', inject: true },

         { src: 'primeng/resources/primeng.min.css', inject: true },
         { src: 'primeng/resources/themes/bootstrap/theme.css', inject: true },

         { src: 'moment/min/moment.min.js', inject: true },
         { src: 'moment/locale/es.js', inject: true },
         { src: 'chart.js/dist/Chart.js', inject: true },

         { src: 'jspdf/dist/jspdf.min.js', inject: true },
         { src: 'html2canvas/dist/html2canvas.js', inject: true },

      ];

      // Add `local` third-party libraries to be injected/bundled.
      this.APP_ASSETS = [
         ...this.APP_ASSETS,
         // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
         // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},

         { src: `${this.ASSETS_SRC}/css/AdminLTE.css`, inject: true, vendor: true },
         { src: `${this.ASSETS_SRC}/css/skins/skin-blue.css`, inject: true, vendor: true },
         { src: `${this.ASSETS_SRC}/css/skins/skin-green.css`, inject: true, vendor: true },
         { src: `${this.ASSETS_SRC}/css/skins/skin-purple.css`, inject: true, vendor: true },
         { src: `${this.ASSETS_SRC}/font/style-th.css`, inject: true, vendor: false },

         // { src: `${this.ASSETS_SRC}/js/fastclick/fastclick.js`, inject: true, vendor: false },
         // { src: `${this.ASSETS_SRC}/js/slimScroll/jquery.slimscroll.min.js`, inject: true, vendor: false },
         { src: `${this.ASSETS_SRC}/js/app.js`, inject: true, vendor: true },
         { src: `${this.ASSETS_SRC}/js/script.js`, inject: true, vendor: false },

      ];

      // Add packages (e.g. ng2-translate)
      let additionalPackages: ExtendPackages[] = [ {
         name: 'ng2-translate',
         //   // Path to the package's bundle
         path: 'node_modules/ng2-translate/bundles/ng2-translate.umd.js'
      }, {
         name: 'angular2-jwt',
         path: 'node_modules/angular2-jwt/angular2-jwt.js'
      }, {
         name: '@ng-idle/core',
         // Path to the package's bundle
         path: 'node_modules/@ng-idle/core/bundles/core.umd.js'
      }, {
         name: '@ng-idle/keepalive',
         // Path to the package's bundle
         path: 'node_modules/@ng-idle/keepalive/bundles/keepalive.umd.js'
      }
      ];
      //
      this.addPackagesBundles( additionalPackages );

      /* Add to or override NPM module configurations: */
      // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });
   }

}
