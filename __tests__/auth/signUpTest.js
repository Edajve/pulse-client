import { checkSignInFields } from '../../app/(auth)/sign-up';

describe('Check sign-in fields validation', () => {
  it('should return false when any field is null', () => {
    const form = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      dateOfBirth: '1990-01-01',
      role: 'USER',
      accountCreatedDate: new Date().toISOString(),
      sex: 'WOMAN',
      countryRegion: 'United States'
    };

    // Test the behavior when any field is null
    form.firstName = null;
    expect(checkSignInFields(form)).toBe(false);

    // Test the behavior when all fields are provided
    form.firstName = 'John';
    expect(checkSignInFields(form)).toBe(true);
  });
});
