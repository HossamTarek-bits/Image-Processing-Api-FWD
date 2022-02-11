import path from 'path';
import fs from 'fs';
import {
    imagePathFormat, checkThumbExists, createThumb, thumbDirPath, fullDirPath,
} from '../../utilities/imageManager';

describe('Image Manager Suite', () => {
    let created = false;

    beforeAll(() => {
        if (!fs.existsSync(path.join(__dirname, '..', '..', '..', 'images', 'thumb', 'palmtunnel-300x150.jpg'))) {
            fs.writeFileSync(path.join(__dirname, '..', '..', '..', 'images', 'thumb', 'palmtunnel-300x150.jpg'), 'w+');
            created = true;
        }
    });
    describe('imagePathFormat Specs', () => {
        it('should return the thumbnail image path when thumbDirPath is provided', () => {
            expect(imagePathFormat(thumbDirPath, 'palmtunnel', 300, 150)).toBe(path.join(__dirname, '..', '..', '..', 'images', 'thumb', 'palmtunnel-300x150.jpg'));
        });
        it('should return the full image path when fullDirPath is provided', () => {
            expect(imagePathFormat(fullDirPath, 'palmtunnel')).toBe(path.join(__dirname, '..', '..', '..', 'images', 'full', 'palmtunnel.jpg'));
        });
        it('should throw error when given any unrecoginzed dirPath', () => {
            expect(() => imagePathFormat('fake path', 'palmtunnel')).toThrowError('Dir provided is incorrect');
        });
    });
    describe('checkThumbExists Specs', () => {
        it('should return true when given an image that already in thumb dir', () => {
            expect(checkThumbExists('palmtunnel', 300, 150)).toBeTrue();
        });
        it('should return false when the image is not in thumb dir', () => {
            expect(checkThumbExists('palmtunnel', 2, 2)).toBeFalse();
        });
    });
    describe('createThumb Specs', () => {
        it('should return true if the image created successfully', async () => {
            const result = await createThumb('palmtunnel', 1, 1);
            expect(result).toBeTrue();
        });
        it('should return false if there is failed', async () => {
            const result = await createThumb('fake image', 1, 1);
            expect(result).toBeFalse();
        });
        afterAll(() => fs.unlinkSync(path.join(__dirname, '..', '..', '..', 'images', 'thumb', 'palmtunnel-1x1.jpg')));
    });
    afterAll(() => {
        if (created) fs.unlinkSync(path.join(__dirname, '..', '..', '..', 'images', 'thumb', 'palmtunnel-300x150.jpg'));
    });
});
