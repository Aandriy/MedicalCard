﻿namespace MedicalCard.Services
{
	public interface ICipherService
	{
		string Encrypt(string input);
		string Decrypt(string cipherText);
	}
}