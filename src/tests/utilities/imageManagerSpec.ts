import path from 'path';
import fs from 'fs';
import {
    imagePathFormat,
    checkThumbExists,
    checkFullExists,
    createThumb,
    thumbDirPath,
    fullDirPath,
} from '../../utilities/imageManager';

describe('Image Manager Suite', (): void => {
    let created = false;

    beforeAll((): void => {
        if (
            !fs.existsSync(
                path.join(
                    __dirname,
                    '..',
                    '..',
                    '..',
                    'images',
                    'thumb',
                    'palmtunnel-300x150.jpg',
                ),
            )
        ) {
            fs.writeFileSync(
                path.join(
                    __dirname,
                    '..',
                    '..',
                    '..',
                    'images',
                    'thumb',
                    'palmtunnel-300x150.jpg',
                ),
                'w+',
            );
            created = true;
        }
    });
    describe('imagePathFormat Specs', (): void => {
        it('should return the thumbnail image path when thumbDirPath is provided', (): void => {
            expect(imagePathFormat(thumbDirPath, 'palmtunnel', 300, 150)).toBe(
                path.join(
                    __dirname,
                    '..',
                    '..',
                    '..',
                    'images',
                    'thumb',
                    'palmtunnel-300x150.jpg',
                ),
            );
        });
        it('should return the full image path when fullDirPath is provided', (): void => {
            expect(imagePathFormat(fullDirPath, 'palmtunnel')).toBe(
                path.join(
                    __dirname,
                    '..',
                    '..',
                    '..',
                    'images',
                    'full',
                    'palmtunnel.jpg',
                ),
            );
        });
        it('should throw error when given any unrecoginzed dirPath', (): void => {
            expect((): string => imagePathFormat('fake path', 'palmtunnel')).toThrowError('Dir provided is incorrect');
        });
    });
    describe('checkThumbExists Specs', (): void => {
        it('should return true when given an image that already in thumb dir', async (): Promise<void> => {
            const result = await checkThumbExists('palmtunnel', 300, 150);
            expect(result).toBeTrue();
        });
        it('should return false when the image is not in thumb dir', async (): Promise<void> => {
            const result = await checkThumbExists('palmtunnel', 2, 2);
            expect(result).toBeFalse();
        });
    });
    describe('checkFullExists Specs', (): void => {
        it('should return true when given an image exists in full dir', async (): Promise<void> => {
            const result = await checkFullExists('palmtunnel');
            expect(result).toBeTrue();
        });
        it("should return false when an image doesn't exist in full dir", async (): Promise<void> => {
            const result = await checkFullExists('fake file');
            expect(result).toBeFalse();
        });
    });
    describe('createThumb Specs', (): void => {
        it('should return true if the image created successfully', async (): Promise<void> => {
            const result = await createThumb('palmtunnel', 1, 1);
            expect(result).toBeTrue();
        });
        it('should return false if there is failed', async (): Promise<void> => {
            const result = await createThumb('fake image', 1, 1);
            expect(result).toBeFalse();
        });
        afterAll((): void => fs.unlinkSync(
            path.join(
                __dirname,
                '..',
                '..',
                '..',
                'images',
                'thumb',
                'palmtunnel-1x1.jpg',
            ),
        ));
    });
    afterAll((): void => {
        if (created) {
            fs.unlinkSync(
                path.join(
                    __dirname,
                    '..',
                    '..',
                    '..',
                    'images',
                    'thumb',
                    'palmtunnel-300x150.jpg',
                ),
            );
        }
    });
});
