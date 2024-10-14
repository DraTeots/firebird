// url.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { UrlService } from './url.service';
import { UserConfigService } from './user-config.service';
import { ServerConfigService } from './server-config.service';
import { BehaviorSubject } from 'rxjs';

describe('UrlService', () => {
  let service: UrlService;
  let userConfigService: UserConfigService;
  let serverConfigService: ServerConfigService;

  beforeEach(() => {
    // Create mock services
    const mockUserConfigService = {
      localServerUrl: {
        subject: new BehaviorSubject<string>('http://localhost:5454'),
        value: 'http://localhost:5454'
      },
      localServerUseApi: {
        subject: new BehaviorSubject<boolean>(false),
        value: false
      }
    };

    const mockServerConfigService = {
      config: {
        servedByPyrobird: false,
        serverHost: 'localhost',
        serverPort: 5000
      }
    };

    TestBed.configureTestingModule({
      providers: [
        UrlService,
        { provide: UserConfigService, useValue: mockUserConfigService },
        { provide: ServerConfigService, useValue: mockServerConfigService }
      ]
    });

    service = TestBed.inject(UrlService);
    userConfigService = TestBed.inject(UserConfigService);
    serverConfigService = TestBed.inject(ServerConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('resolveDownloadUrl', () => {
    it('should return absolute URL as is (Case 1.1)', () => {
      const inputUrl = 'https://example.com/file.root';
      const resolvedUrl = service.resolveDownloadUrl(inputUrl);
      expect(resolvedUrl).toBe(inputUrl);
    });

    it('should handle relative URL without protocol when backend is available (Case 1.2)', () => {
      // Simulate backend availability
      userConfigService.localServerUseApi.subject.next(true);

      const inputUrl = '/path/to/file.root';
      const expectedUrl = 'http://localhost:5454/api/v1/download?f=%2Fpath%2Fto%2Ffile.root';

      const resolvedUrl = service.resolveDownloadUrl(inputUrl);
      expect(resolvedUrl).toBe(expectedUrl);
    });

    it('should handle relative URL without protocol when backend is not available (Case 1.2)', () => {
      // Ensure backend is not available
      userConfigService.localServerUseApi.subject.next(false);

      const inputUrl = '/path/to/file.root';
      const resolvedUrl = service.resolveDownloadUrl(inputUrl);
      expect(resolvedUrl).toBe(inputUrl);
    });

    it('should handle URLs starting with asset://', () => {
      const inputUrl = 'asset://images/logo.png';
      const baseUri = document.baseURI.endsWith('/') ? document.baseURI : `${document.baseURI}/`;
      const expectedUrl = `${baseUri}assets/images/logo.png`;

      const resolvedUrl = service.resolveDownloadUrl(inputUrl);
      expect(resolvedUrl).toBe(expectedUrl);
    });

    it('should handle URLs with custom protocol alias epic://', () => {
      const inputUrl = 'epic://some/path/file.root';
      const expectedUrl = 'https://eic.github.io/epic/artifacts/some/path/file.root';

      const resolvedUrl = service.resolveDownloadUrl(inputUrl);
      expect(resolvedUrl).toBe(expectedUrl);
    });

    it('should encode the input URL correctly in download endpoint', () => {
      // Simulate backend availability
      userConfigService.localServerUseApi.subject.next(true);

      const inputUrl = '/path with spaces/file.root';
      const expectedUrl = 'http://localhost:5454/api/v1/download?f=%2Fpath%20with%20spaces%2Ffile.root';

      const resolvedUrl = service.resolveDownloadUrl(inputUrl);
      expect(resolvedUrl).toBe(expectedUrl);
    });
  });

  describe('resolveConvertUrl', () => {
    it('should construct convert URL when backend is available', () => {
      // Simulate backend availability
      userConfigService.localServerUseApi.subject.next(true);

      const inputUrl = 'https://example.com/file.root';
      const fileType = 'edm4eic';
      const entries = 'all';
      const expectedUrl = `http://localhost:5454/api/v1/convert/${fileType}/${entries}?f=${encodeURIComponent(inputUrl)}`;

      const resolvedUrl = service.resolveConvertUrl(inputUrl, fileType, entries);
      expect(resolvedUrl).toBe(expectedUrl);
    });

    it('should return input URL when backend is not available', () => {
      // Ensure backend is not available
      userConfigService.localServerUseApi.subject.next(false);

      const inputUrl = 'https://example.com/file.root';
      const fileType = 'edm4eic';
      const entries = 'all';

      const resolvedUrl = service.resolveConvertUrl(inputUrl, fileType, entries);
      expect(resolvedUrl).toBe(inputUrl);
    });

    it('should handle URLs starting with asset:// in convert URL', () => {
      // Simulate backend availability
      userConfigService.localServerUseApi.subject.next(true);

      const inputUrl = 'asset://data/sample.dat';
      const baseUri = document.baseURI.endsWith('/') ? document.baseURI : `${document.baseURI}/`;
      const resolvedAssetUrl = `${baseUri}assets/data/sample.dat`;

      const fileType = 'edm4eic';
      const entries = 'all';
      const expectedUrl = `http://localhost:5454/api/v1/convert/${fileType}/${entries}?f=${encodeURIComponent(resolvedAssetUrl)}`;

      const resolvedUrl = service.resolveConvertUrl(inputUrl, fileType, entries);
      expect(resolvedUrl).toBe(expectedUrl);
    });

    it('should handle URLs with custom protocol alias epic:// in convert URL', () => {
      // Simulate backend availability
      userConfigService.localServerUseApi.subject.next(true);

      const inputUrl = 'epic://some/path/file.root';
      const resolvedAliasUrl = 'https://eic.github.io/epic/artifacts/some/path/file.root';

      const fileType = 'edm4eic';
      const entries = 'all';
      const expectedUrl = `http://localhost:5454/api/v1/convert/${fileType}/${entries}?f=${encodeURIComponent(resolvedAliasUrl)}`;

      const resolvedUrl = service.resolveConvertUrl(inputUrl, fileType, entries);
      expect(resolvedUrl).toBe(expectedUrl);
    });
  });

  describe('backend availability and server address', () => {
    it('should use PyroBird server address if servedByPyrobird is true', () => {
      // Simulate PyroBird server
      serverConfigService.config.servedByPyrobird = true;
      serverConfigService.config.serverHost = 'pyrobirdhost';
      serverConfigService.config.serverPort = 8080;

      const expectedServerAddress = `${window.location.protocol}//pyrobirdhost:8080`;

      // Reinitialize the service to pick up new config
      service = new UrlService(userConfigService, serverConfigService);

      // Access private property via getter (assuming you add getters)
      // expect(service.getServerAddress()).toBe(expectedServerAddress);

      // Or access private property directly for testing purposes
      expect((service as any).serverAddress).toBe(expectedServerAddress);
    });

    it('should use user-configured server address if localServerUseApi is true', () => {
      userConfigService.localServerUseApi.subject.next(true);
      userConfigService.localServerUrl.subject.next('http://customserver:1234');

      const expectedServerAddress = 'http://customserver:1234';

      // Reinitialize the service to pick up new config
      service = new UrlService(userConfigService, serverConfigService);

      expect((service as any).serverAddress).toBe(expectedServerAddress);
    });

    it('should have backend unavailable when neither PyroBird nor user API is configured', () => {
      userConfigService.localServerUseApi.subject.next(false);
      serverConfigService.config.servedByPyrobird = false;

      // Reinitialize the service to pick up new config
      service = new UrlService(userConfigService, serverConfigService);

      expect((service as any).isBackendAvailable).toBe(false);
      expect((service as any).serverAddress).toBe('');
    });
  });
});
