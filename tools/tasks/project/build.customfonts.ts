import * as gulp from 'gulp';
import Config from '../../config';

export = () => {
   return gulp.src(Config.CUSTOMFONTS_SRC)
   .pipe(gulp.dest(Config.CUSTOMFONTS_DEST));
};
