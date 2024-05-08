using Microsoft.Win32;
using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using TagLib;

namespace RenommageMusique
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public class FichierMP3
        {
            public string NomFichier { get; set; }
            public string NommageActuel { get; set; }
            public string Titre { get; set; }
            public string Artiste { get; set; }
            public File FichierSource { get; set; }

            public FichierMP3(File fichier)
            {
                string partieDroite = fichier.Name.Substring(fichier.Name.LastIndexOf("\\") + 1);
                NommageActuel = partieDroite;
                NomFichier = fichier.Name;
                Titre = fichier.Tag.Title;
                Artiste = string.Join(";", fichier.Tag.Performers);
                FichierSource = fichier;
            }
        }

        public ObservableCollection<FichierMP3> Fichiers { get; set; }

        public MainWindow()
        {
            InitializeComponent();
            Fichiers = new ObservableCollection<FichierMP3>();
            DataContext = this;
        }

        private void ChargerFichiers_Click(object sender, RoutedEventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            openFileDialog.Multiselect = true;
            openFileDialog.Filter = "Fichiers audio (*.mp3, *.wma, *.m4a)|*.mp3;*.wma;*.m4a";

            if (openFileDialog.ShowDialog() == true)
            {
                foreach (string fileName in openFileDialog.FileNames)
                {
                    Fichiers.Add(new FichierMP3(File.Create(fileName)));
                }
            }
        }

        private void RenommerFichiers_Click(object sender, RoutedEventArgs e)
        {
            string format = (comboBoxFormat.SelectedItem as ComboBoxItem)?.Content.ToString();
            if (format != null)
            {
                foreach (var fic in Fichiers)
                {
                    var fichier = fic.FichierSource;
                    string partieGauche = fichier.Name.Substring(0, fichier.Name.LastIndexOf("\\")) + "\\";
                    var extension = string.Empty;
                    var nouveauNom = string.Empty;
                    switch (fichier.MimeType)
                    {
                        case "taglib/mp3":
                            extension = ".mp3";
                            break;
                        case "taglib/m4a":
                            extension = ".m4a";
                            break;
                        case "taglib/wma":
                            extension = ".wma";
                            break;
                    }
                    if (format == "Titre - Artiste")
                    {
                        nouveauNom = $"{fichier.Tag.Title} - {fichier.Tag.FirstPerformer}";
                    }
                    else
                    {
                        nouveauNom = $"{fichier.Tag.FirstPerformer} - {fichier.Tag.Title}";
                    }
                    // règles à implémenter si caractères problématiques
                    nouveauNom = nouveauNom.Replace("/", " & "); // Si plusieurs artistes : remplacer / par &
                    System.IO.File.Move(fichier.Name, $"{partieGauche}{nouveauNom}{extension}");
                }
                Fichiers.Clear();
            }
            else
            {
                MessageBox.Show("Choisir le format de renommage", "Erreur", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void DataGrid_CellEditEnding(object sender, DataGridCellEditEndingEventArgs e)
        {
            var fic = (FichierMP3)e.Row.Item;
            var column = e.Column as DataGridBoundColumn;
            if (column != null)
            {
                var bindingPath = (column.Binding as Binding)?.Path.Path;
                if (bindingPath != null)
                {
                    var textBox = e.EditingElement as System.Windows.Controls.TextBox;
                    if (textBox != null)
                    {
                        var property = fic.GetType().GetProperty(bindingPath);
                        if (property != null)
                        {
                            property.SetValue(fic, textBox.Text);
                            var fichier = fic.FichierSource;
                            fichier.Tag.Title = fic.Titre;
                            fichier.Tag.Performers = fic.Artiste.Split(';');
                            fichier.Save();
                        }
                    }
                }
            }
        }

        private void ViderTableau_Click(object sender, RoutedEventArgs e)
        {
            Fichiers.Clear();
        }

        private void TesterApplication_Click(object sender, RoutedEventArgs e)
        {
            string dossierDeTest = "Samples"; // Nom du dossier contenant les fichiers de test
            string cheminDossierDeTest = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, dossierDeTest);

            // Vérifie si le dossier de test existe
            if (System.IO.Directory.Exists(cheminDossierDeTest))
            {
                string[] fichiersDeTest = System.IO.Directory.GetFiles(cheminDossierDeTest, "*.*")
                    .Where(f => f.ToLower().EndsWith(".mp3") || f.ToLower().EndsWith(".wma") || f.ToLower().EndsWith(".m4a"))
                    .ToArray();
                // Ajouter les fichiers chargés à la collection Fichiers
                foreach (string fichier in fichiersDeTest)
                {
                    Fichiers.Add(new FichierMP3(File.Create(fichier)));
                }
            }
            else
            {
                MessageBox.Show("Le dossier de test n'existe pas.", "Erreur", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void SupprimerSelection_Click(object sender, RoutedEventArgs e)
        {
            // Récupérer les éléments sélectionnés dans le DataGrid
            var elementsSelectionnes = dataGridFichiers.SelectedItems.Cast<FichierMP3>().ToList();

            // Parcourir les éléments sélectionnés et les supprimer de la collection
            foreach (var element in elementsSelectionnes)
            {
                Fichiers.Remove(element);
            }
        }
    }
}
